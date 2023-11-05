import { useContext } from 'react'
import { BetContext } from '../../contexts';

const Betslip = () => {
    const { state } = useContext(BetContext);
    console.log('state', state.odds)
  return (
    <div className='betslip'>
        <div className="betslip-events">
            {!!state.odds && state.odds.length ? state.odds.map(odd => (
                <div key={odd.NID} className='betslip-event'>
                    <span className='mbs'>{odd.MBS}</span>
                    <span className='code'>Kod: {odd.C}</span>
                    <span className='match'>Maç: {odd.N}</span>
                    <span className='odd'>Oran: {odd.O}</span>
                </div>
            )): null}
        </div>
        <div className="betslip-total">
           Toplam Tutar: { state.total } TL
        </div>
    </div>
  )
}

export default Betslip