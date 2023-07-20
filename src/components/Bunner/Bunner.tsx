import './bunner.scss';
import { SearchInput } from '../SearchInput';

export const Bunner = () => {
  return (
    <div className="bunner">
      <div className='bunner__content'>
        <h1 className='bunner__title'>
          Unsplash
        </h1>

        <p className='bunner__subtitle'>
          The internet’s source for visuals. <br/>Powered by creators everywhere.
        </p>

        <SearchInput />
      </div>
    </div>
  )
}