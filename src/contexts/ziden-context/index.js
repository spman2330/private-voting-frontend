import { createContext, useCallback, useEffect, useState } from "react";
import {
  params,
  auth,
  db,
  state,
  stateTransition,
  OPERATOR,
  claim,
  utils,
  queryMTP,
} from "zidenjs";
import React from "react";
import { useWeb3Context } from "../web3-context";
import { useContractContext } from "../contract-context";
const ZidenContext = createContext();

export const ZidenProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [claims, setClaims] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [factor, setFactor] = useState([]);
  const { address } = useWeb3Context();
  const { registerCallContract } = useContractContext()
  const BigInt = window.BigInt;
  const setupUsers = async () => {
    console.log("setup users");
    const users = [];

    const numberOfUsers = 6;
    for (let i = 0; i < numberOfUsers; i++) {
      const privateKey = Buffer.alloc(32, i * 11 + 11);
      const userAuth = auth.newAuthFromPrivateKey(privateKey);
      const authsDb = new db.SMTLevelDb("db_test/user" + i + "/auths");
      const claimsDb = new db.SMTLevelDb("db_test/user" + i + "/claims");
      const authRevDb = new db.SMTLevelDb("db_test/user" + i + "/authRev");
      const claimRevDb = new db.SMTLevelDb("db_test/user" + i + "/claimRev");
      const userState = await state.State.generateState(
        [userAuth],
        authsDb,
        claimsDb,
        authRevDb,
        claimRevDb
      );

      const user = {
        auths: [
          {
            privateKey,
            value: userAuth,
            isRevoked: false,
          },
        ],
        state: userState,
      };
      users.push(user);
    }
    let query0, query1, query2;
    query0 = {
      slotIndex: 2,
      operator: OPERATOR.GREATER_THAN,
      values: [BigInt("0")],
      from: 50,
      to: 100,
      valueTreeDepth: 6,
      timestamp: Date.now() + 1000000000,
      claimSchema: BigInt("13741492"),
    };

    query1 = {
      slotIndex: 3,
      operator: OPERATOR.GREATER_THAN,
      values: [BigInt("0")],
      from: 50,
      to: 100,
      valueTreeDepth: 6,
      timestamp: Date.now() + 1000000000,
      claimSchema: BigInt("13741493"),
    };

    query2 = {
      slotIndex: 6,
      operator: OPERATOR.GREATER_THAN,
      values: [BigInt("0")],
      from: 50,
      to: 100,
      valueTreeDepth: 6,
      timestamp: Date.now() + 1000000000,
      claimSchema: BigInt("13741494"),
    };

    setQueries([query0, query1, query2]);
    let claim0, claim1, claim2;

    const { newClaim, schemaHashFromBigInt, withIndexID, withSlotData } = claim;
    const { numToBits, setBits } = utils;
    const amount0 = BigInt("10000011")
    const amount1 = BigInt("100000011");
    const amount2 = BigInt("1000000011")
    setAmounts([amount0.toString(), amount1.toString(), amount2.toString()])
    claim0 = newClaim(
      schemaHashFromBigInt(query0.claimSchema),
      withIndexID(users[3].state.userID),
      withSlotData(
        query0.slotIndex,
        numToBits(
          setBits(BigInt(0), query0.from, amount0),
          32
        )
      )
    );
    claim1 = newClaim(
      schemaHashFromBigInt(query1.claimSchema),
      withIndexID(users[4].state.userID),
      withSlotData(
        query1.slotIndex,
        numToBits(
          setBits(BigInt(0), query1.from, amount1),
          32
        )
      )
    );
    claim2 = newClaim(
      schemaHashFromBigInt(query2.claimSchema),
      withIndexID(users[5].state.userID),
      withSlotData(
        query2.slotIndex,
        numToBits(
          setBits(BigInt(0), query2.from, amount2),
          32
        )
      )
    );

    setClaims([claim0, claim1, claim2]);
    const issueClaims = async (userIndex, claims) => {
      const user = users[userIndex];
      await stateTransition.stateTransitionWitnessWithPrivateKey(
        user.auths[0].privateKey,
        user.auths[0].value,
        user.state,
        [],
        claims,
        [],
        []
      );
    };

    await issueClaims(0, [claim0]); // issuer: user0, holder: user3, claim: 0
    await issueClaims(1, [claim1]); // issuer: user1, holder: user4, claim: 1
    await issueClaims(2, [claim2]); // issuer: user2, holder: user5, claim: 2

    setUsers(users);
  };

  const callData = async (proof, publicSignals) => {
    const callData = (
      await window.snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    )
      .toString()
      .split(",")
      .map((e) => {
        return e.replaceAll(/([\[\]\s\"])/g, "");
      });
    let a,
      b = [],
      c,
      publicInputs;
    a = callData.slice(0, 2).map((e) => BigInt(e));
    b[0] = callData.slice(2, 4).map((e) => BigInt(e));
    b[1] = callData.slice(4, 6).map((e) => BigInt(e));
    c = callData.slice(6, 8).map((e) => BigInt(e));
    publicInputs = callData.slice(8, callData.length).map((e) => BigInt(e));
    return { a, b, c, pubSigs: publicInputs };
  };

  const getZidenFactor = async (queryId) => {
    const allowedQueries = await registerCallContract.allowedQueries(queryId);
    return allowedQueries.factor.toString();
  }

  const getFactor = async () => {
    factor[0] = await getZidenFactor(0);
    factor[1] = await getZidenFactor(1);
    factor[2] = await getZidenFactor(2);
    setFactor([...factor])
  }
  // 0, 3, 0, 0
  // 1, 4, 1, 1
  // 2, 5, 2, 2

  const genGetVotingPowerCalldata = async (
    issuerIndex,
    holderIndex,
    claimIndex,
    queryIndex
  ) => {
    var time = Date.now();
    //try {
    const claim = claims[claimIndex];
    const query = queries[queryIndex];
    const issuer = users[issuerIndex];
    const holder = users[holderIndex];
    const kycMTPInput = await queryMTP.kycGenerateQueryMTPInput(
      claim.hiRaw(),
      issuer.state
    );
    const kycNonRevInput = await queryMTP.kycGenerateNonRevQueryMTPInput(
      claim.getRevocationNonce(),
      issuer.state
    );
    const inputs = await queryMTP.holderGenerateQueryMTPWitnessWithPrivateKey(
      claim,
      holder.auths[0].privateKey,
      holder.auths[0].value,
      BigInt(address),
      holder.state,
      kycMTPInput,
      kycNonRevInput,
      query
    );
    const PUBLIC_URL = window.location.origin;
    const start = Date.now();
    console.log(window.snarkjs)
    const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
      inputs,
      PUBLIC_URL + "/credentialAtomicQueryMTP.wasm",
      PUBLIC_URL + "/credentialAtomicQueryMTP.zkey"
    );

    const provingTime = (Date.now() - start) / 1000;
    console.log("Proving time: " + provingTime);
    console.log(await callData(proof, publicSignals))
    return await callData(proof, publicSignals);
    // } catch (err) {
    //   console.error(err);
    // }
  };
  const init = useCallback(async () => {
    await getFactor();
    await params.setupParams();
    await setupUsers();
  }, []);
  useEffect(() => {
    init();
  }, [init]);

  return <ZidenContext.Provider value={{ genGetVotingPowerCalldata, amounts, queries, factor, setQueries }}>{children}</ZidenContext.Provider>;
};
export const useZidenContext = () => React.useContext(ZidenContext);
