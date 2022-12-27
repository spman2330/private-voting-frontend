import { useWeb3Context } from "../../contexts/web3-context";

function Layout({ children }) {
    const { address, chain, connectMetaMask } = useWeb3Context();
    const reduce = (address) => {
        var reduceAddress = address.slice(0, 6) + "..." + address.slice(-4);
        return reduceAddress;
    }
    return (<div>
        <div class="p-3 text-bg-dark fixed-top" >
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <div class="col-2 h3">Private Voting</div>
                <div class="col-9 h5">{chain.name}</div>
                <div class="col-1">
                    {address != null ? reduce(address) : <button className="btn btn-outline-light me-2 text-end" onClick={connectMetaMask}>Connect wallet</button>}
                </div>
            </div>

        </div>
        <div class="mt-5 pt-5 container">
            {children}
        </div>
    </div>);
}

export default Layout;