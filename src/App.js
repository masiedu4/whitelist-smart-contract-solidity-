/**
 * @description      :
 * @author           : Michael
 * @group            :
 * @created          : 13/04/2022 - 16:31:16
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 13/04/2022
 * - Author          : Michael
 * - Modification    :
 **/
import "./styles.css";
import Whitelist from "./components/Whitelist";
import { ContractProvider } from "./context/ContractContext";
export default function App() {
  return (
    <>
      <ContractProvider>
        <div className="App">
          <Whitelist />
        </div>
      </ContractProvider>
    </>
  );
}
