export type Status = '예정'|'검수중'|'적치완료'|'작업대기'|'피킹중'|'패킹중'|'출고완료'|'접수'|'검수완료'|'재입고완료';
export interface Client {id:string; name:string; code:string; contact:string}
export interface Warehouse {id:string; name:string; code:string; address:string}
export interface Product {id:string; sku:string; name:string; clientId:string; category:string; color:string; size:string; barcode:string; safetyStock:number}
export interface Inventory {id:string; productId:string; warehouseId:string; location:string; quantity:number; allocated:number}
export interface Inbound {id:string; clientId:string; warehouseId:string; productId:string; expected:number; received:number; date:string; status:Status}
export interface Outbound {id:string; clientId:string; warehouseId:string; productId:string; quantity:number; date:string; recipient:string; status:Status}
export interface ReturnOrder {id:string; outboundId:string; productId:string; quantity:number; reason:string; status:Status; date:string}
export interface Movement {id:string; productId:string; warehouseId:string; type:'입고'|'출고'|'이동'|'조정'|'반품'; delta:number; note:string; at:string}
export interface DB {clients:Client[];warehouses:Warehouse[];products:Product[];inventory:Inventory[];inbounds:Inbound[];outbounds:Outbound[];returns:ReturnOrder[];movements:Movement[]}
