import { Service } from "typedi";
import DevTokenABI from "../../artifacts/contracts/DevToken.sol/DevToken.json";

export type DevTokenABIType = typeof DevTokenABI;

@Service()
export default class DevTokenABIService {
  constructor () {}

  async getDevTokenABI() {
    console.log(DevTokenABI)

    return DevTokenABI;
  }
}