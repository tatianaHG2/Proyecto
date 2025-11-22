type props={
    num : number;
    pinta: string;
   mostrarCarta: (num: number, pinta: string) => void
}


function Cartas({num,pinta, mostrarCarta}: props ){
    const hadleClick=()=>{
        mostrarCarta(num, pinta);
    };
    return(
        
        <button onClick={hadleClick}>
     <h1> Soy la carta {num + 40 + "" + pinta}</h1>;
    </button>
    )
}
export default Cartas;