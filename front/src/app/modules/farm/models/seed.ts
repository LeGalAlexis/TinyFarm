import { Plant } from "./plant";

export interface Seed {
    id: number;
    name: string;
    plant: Plant;
}