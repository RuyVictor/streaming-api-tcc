import { IPagination } from "../../common/interfaces/Pagination";

export interface IStreamSearchDTO extends IPagination {
    query?: string;
    status?: string;
    category?: string;
}