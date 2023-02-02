import { ToastContainer } from 'react-toastify';

import { TableCarritoProductos, TableProductosMesero } from '@/components';
import { OrdenProvider } from '@/context/OrdenContext';

const TomarOrden = () => {
  return (
    <OrdenProvider>
      <div>
        <ToastContainer />
        <div className="mb-10">
          <TableCarritoProductos />
        </div>
        <div>
          <TableProductosMesero />
        </div>
      </div>
    </OrdenProvider>
  );
};

export default TomarOrden;
