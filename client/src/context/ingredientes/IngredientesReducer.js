export const ingredienteReducer = (state, action) => {
  switch (action.type) {
    case "GET_INGREDIENTES":
      return {
        ...state,
        ingredientes: action.payload,
      };
    case "ADD_INGREDIENTE":
      return {
        ...state,
        ingredientes: [...state.ingredientes, action.payload],
      };
    case "UPDATE_INGREDIENTE": {
      const updateIngrediente = action.payload;
      const updateIngredientes = [];

      for (let i = 0; i < state.ingredientes.length; i++) {
        if (state.ingredientes[i].id === updateIngrediente.id) {
          updateIngredientes.push(updateIngrediente);
        } else {
          updateIngredientes.push(state.ingredientes[i]);
        }
      }
      return {
        ...state,
        ingredientes: updateIngredientes,
      };
    }
    case "DELETE_INGREDIENTE":
      return {
        ...state,
        ingredientes: state.ingredientes.filter(
          (ingrediente) => ingrediente.id !== action.payload
        ),
      };
  }
};
