import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useContext, useRef, useState } from 'react';

import { Loader } from '@/components';
import '@/styles/aditional-styles/checkbox.css';
import { SelectedProductContext } from '@/pages/admin/Productos';
import TabProducto from './productos/TabProducto';
import TabPreparaciones from './productos/TabPreparaciones';

const Tap = ({ onClose }) => {
  const { loading, onSubmit } = useContext(SelectedProductContext);
  const [value, setValue] = useState('1');
  const formRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue || '');
  };

  const handleReset = () => {
    formRef.current.reset();
    onClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Producto" value="1" />
            <Tab label="Preparacion" value="2" />
          </TabList>
        </Box>
        <form id="form" onSubmit={onSubmit} ref={formRef}>
          <TabPanel value="1">
            <TabProducto />
          </TabPanel>
          <TabPanel value="2">
            <TabPreparaciones />
          </TabPanel>
          <div className="flex gap-3 justify-center mt-4">
            <button type="submit" className="btn">
              {loading ? <Loader /> : 'Guardar'}
            </button>
            <button
              type="button"
              className="btnCancel cursor-pointer"
              onClick={handleReset}
            >
              Cancelar
            </button>
          </div>
        </form>
      </TabContext>
    </Box>
  );
};

export default Tap;
