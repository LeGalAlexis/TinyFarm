import { PlantInPlot } from "./plantInPlot";

export interface Plot {
    id: number;
    isWild: boolean;
    isDry: boolean;
    growingPlant: PlantInPlot | undefined;
}