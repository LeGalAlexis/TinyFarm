import { FarmingTools } from "./farmingTools";

export interface FarmingCommand {
    farmingTool: FarmingTools;
    plotIds: number[];
}