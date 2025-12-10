export type ResposeData<D> = {
    data: D[] | D;
    message: string,
    status: number;
};