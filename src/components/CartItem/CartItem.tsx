import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const decrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles['item']}>
      <div
        className={styles['image']}
        style={{ backgroundImage: `url('${props.image}')` }}
      />
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['price']}> {props.price}&nbsp;₽</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['minus']} onClick={decrease}>
          <img src='/minus-icon.svg' alt='remove' />
        </button>
        <div>{props.count}</div>
        <button className={styles['plus']} onClick={increase}>
          <img src='/plus-icon.svg' alt='add' />
        </button>
        <button className={styles['remove']} onClick={remove}>
          <img src='/delete-icon.svg' alt='remove all' />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
