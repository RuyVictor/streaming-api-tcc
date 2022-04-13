import { IPagination } from "../../common/interfaces/Pagination";

export interface ICategorySearchDTO extends IPagination {
    name: string;
}