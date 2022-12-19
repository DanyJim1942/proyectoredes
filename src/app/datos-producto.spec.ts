import { DatosProducto } from './datos-producto';

describe('DatosProducto', () => {
  it('should create an instance', () => {
    expect(new DatosProducto("","","","")).toBeTruthy();
  });
});
