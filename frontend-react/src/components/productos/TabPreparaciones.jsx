import { useContext, useState } from 'react';
import { Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import TableIngredientesTab from '@/components/tables/productos/tab/TableIngredientesTab';
import InputIngrediente from './InputIngrediente';
import { SelectedProductContext } from '@/pages/admin/Productos';
import ChipPreparacion from './ChipPreparacion';

const sizes = {
  pequeña: 'Pequeña',
  mediana: 'Mediana',
  grande: 'Grande',
  unico: 'Única'
};

export default function TabPreparaciones() {
  const { ingredientes, selectedProduct } = useContext(SelectedProductContext);

  const [selectedSizes, setSelectedSizes] = useState(() =>
    selectedProduct.selectedSizes.map((item) => ({
      key: item,
      value: sizes[item]
    }))
  );

  const [selectedTab, setSelectedTab] = useState(
    () => selectedProduct.selectedSizes.at(-1) || ''
  );

  const [carrito, setCarrito] = useState([]);

  const handleChangeChecked = (e, item) => {
    if (!e.target.checked) {
      const nextSizes = selectedSizes.filter((a) => a.key !== item.key);
      setSelectedTab(nextSizes.at(-1)?.key || '');
      setSelectedSizes(nextSizes);
      return;
    }

    if (item.key === 'unico') {
      setSelectedTab('unico');
      setSelectedSizes([item]);
      return;
    }

    setSelectedTab(item.key);
    setSelectedSizes((current) => [...current, item]);
  };

  const deleteIngrediente = (id) => {
    setCarrito((current) => current.filter((item) => item.id !== id));
  };

  return (
    <>
      <ul className="ks-cboxtags flex flex-wrap justify-center gap-1">
        {Object.entries(sizes).map(([key, value]) => (
          <ChipPreparacion
            key={key}
            item={{ key, value }}
            isChecked={selectedSizes.some((size) => size.key === key)}
            isDisabled={
              selectedSizes.some((size) => size.key === 'unico') &&
              key !== 'unico'
            }
            onChange={handleChangeChecked}
          />
        ))}
      </ul>
      <TableIngredientesTab
        carrito={carrito}
        setCarrito={setCarrito}
        selectedSizes={selectedSizes}
      />
      <div className="mt-2">
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(event, value) => setSelectedTab(value)}>
              {selectedSizes.map((item) => (
                <Tab key={item.key} label={item.value} value={item.key} />
              ))}
            </TabList>
          </Box>

          {selectedSizes.map((size) => (
            <TabPanel value={size.key} key={size.key}>
              {ingredientes.map((item) => (
                <InputIngrediente
                  key={item.id}
                  size={size}
                  item={item}
                  onDelete={deleteIngrediente}
                />
              ))}
            </TabPanel>
          ))}
        </TabContext>
      </div>
    </>
  );
}
