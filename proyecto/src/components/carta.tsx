type Props = {
  num: number;
  pinta: string;
  mostrarCarta: (num: number, pinta: string) => void;
};

function Cartas({ num, pinta, mostrarCarta }: Props) {
  const handleClick = () => {
    mostrarCarta(num, pinta);
  };

  return (
    <button onClick={handleClick} className="p-2">
      <h1>
        Soy la carta {num} {pinta}
      </h1>
    </button>
  );
}

export default Cartas;
