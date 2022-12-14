const ButtonMesero = ({ showButton, setShowButton, product }) => {

  return (
    <div>
        {showButton && (
            <button>Agregar</button>
        )}
    </div>
    );
};

export default ButtonMesero;
