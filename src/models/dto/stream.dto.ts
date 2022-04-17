import { IPagination } from "../../common/interfaces/Pagination";

export interface IStreamSearchDTO extends IPagination {
    title?: string;
    status?: string;
    category?: string;
}