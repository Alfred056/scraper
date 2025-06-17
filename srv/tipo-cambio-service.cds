using { cuid } from '@sap/cds/common';

service TipoCambioService {
  function obtener() returns TipoCambioResult;
}

type TipoCambioResult : {
  moneda: String;
  compra: String;
  venta: String;
}
