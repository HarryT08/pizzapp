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
  const { producto, preparaciones, setPreparaciones } = useContext(
    SelectedProductContext
  );

  const [selectedSizes, setSelectedSizes] = useState(() =>
    producto.selectedSizes.map((item) => ({
      key: item,
      value: sizes[item]
    }))
  );

  const [selectedTab, setSelectedTab] = useState(
    () => producto.selectedSizes.at(-1) || ''
  );

  const handleChangeChecked = (e, size) => {
    if (!e.target.checked) {
      const nextSizes = selectedSizes.filter((a) => a.key !== size.key);

      setSelectedTab(nextSizes.at(-1)?.key || '');
      setSelectedSizes(nextSizes);
      setPreparaciones((draft) =>
        draft.filter((it) => it.tamanio !== size.key)
      );
      return;
    }

    if (size.key === 'unico') {
      setSelectedTab('unico');
      setSelectedSizes([size]);
      setPreparaciones((draft) => draft.filter((it) => it.tamanio === 'unico'));
      return;
    }

    setSelectedTab(size.key);
    setSelectedSizes((current) => [...current, size]);

    const record = {};

    preparaciones.forEach(
      (item) => (record[item.id_materia] = item.materiaPrima)
    );

    const newPreparaciones = Object.values(record).map((item) => ({
      id_materia: item.id,
      id_producto: producto.id,
      tamanio: size.key,
      cantidad: 1,
      materiaPrima: item
    }));

    setPreparaciones((current) => current.concat(newPreparaciones));
  };

  const deleteIngrediente = (id) => {
    setPreparaciones((current) =>
      current.filter((item) => item.id !== id && item.tamanio === selectedTab)
    );
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
            onChange={(e) => handleChangeChecked(e, { key, value })}
          />
        ))}
      </ul>
      <TableIngredientesTab selectedSizes={selectedSizes} />
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
              {preparaciones
                .filter((it) => it.tamanio === selectedTab)
                .map((it) => (
                  <InputIngrediente
                    key={`${it.id_materia}-${it.tamanio}`}
                    preparacion={it}
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
