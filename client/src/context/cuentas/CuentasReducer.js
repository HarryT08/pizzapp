export const cuentaReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CUENTAS":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_CUENTAS_SUCCESS":
      return {
        ...state,
        cuentas: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_CUENTAS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_CUENTA":
      return {
        ...state,
        cuentas: state.cuentas.filter(
          (cuenta) => cuenta.cedula !== action.payload
        ),
      };
    case "FETCH_PERSON_SUCCESS":
      return {
        ...state,
        persona: action.payload,
      };
    case "FETCH_PERSON_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CREATE_CUENTA":
      return {
        ...state,
        cuentas: [...state.cuentas, action.payload],
      };
    default:
      return state;
  }
};
