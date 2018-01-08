export class Page<TEntity> {
    currentPage: number;
    pageSize: number;
    total: number;
    totalPages: number;
    totalItems: number;
    items: Array<TEntity>;
}