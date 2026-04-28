import React, { useMemo, useState } from 'react';
import Toast from './components/Toast';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import CoverScreen from './screens/CoverScreen';
import CustomerScreen from './screens/CustomerScreen';
import HomeScreen from './screens/HomeScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import SuccessScreen from './screens/SuccessScreen';
import { selfScanApi } from './services/selfScanApi';

export default function App() {
  const [screen, setScreen] = useState('cover');
  const [contextId, setContextId] = useState('');
  const [query, setQuery] = useState('EUCER');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState(null);
  const [toast, setToast] = useState('');
  const [rut, setRut] = useState('');
  const [name, setName] = useState('');
  const [amountPaid, setAmountPaid] = useState('');

  const total = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  const showError = (e) => setToast(e?.message || 'Error inesperado');

  const start = async () => {
    try {
      const res = await selfScanApi.createContext();
      setContextId(res.contextId);
      setCart([]);
      setScreen('home');
    } catch (e) {
      showError(e);
    }
  };

  const search = async () => {
    try {
      const res = await selfScanApi.searchProducts(query, contextId);
      setProducts(res.items || []);
      setScreen('results');
    } catch (e) {
      showError(e);
    }
  };

  const addItem = async (product) => {
    try {
      await selfScanApi.addItem({ contextId, productId: product.id, quantity: 1 });
      setCart((prev) => {
        const existing = prev.find((x) => x.id === product.id);
        if (existing) {
          return prev.map((x) => (x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x));
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setToast('Producto agregado');
      setTimeout(() => setToast(''), 1400);
    } catch (e) {
      showError(e);
    }
  };

  const saveCustomer = async () => {
    try {
      if (rut && name) {
        await selfScanApi.setCustomer({ contextId, rut, name });
      }
      setScreen('checkout');
    } catch (e) {
      showError(e);
    }
  };

  const pay = async () => {
    try {
      const res = await selfScanApi.createPayment({
        contextId,
        method: 'cash',
        amountPaid: Number(amountPaid || 0),
      });
      setPayment(res);
      setScreen('receipt');
    } catch (e) {
      showError(e);
    }
  };

  if (screen === 'cover') {
    return <CoverScreen onStart={start} />;
  }

  if (screen === 'home') {
    return (
      <>
        <HomeScreen
          query={query}
          setQuery={setQuery}
          onSearch={search}
          onCart={() => setScreen('cart')}
          onCancel={() => setScreen('cover')}
        />
        <Toast message={toast} />
      </>
    );
  }

  if (screen === 'results') {
    return <SearchResultsScreen products={products} onAdd={addItem} onBack={() => setScreen('home')} />;
  }

  if (screen === 'cart') {
    return <CartScreen items={cart} total={total} onCheckout={() => setScreen('customer')} onBack={() => setScreen('home')} />;
  }

  if (screen === 'customer') {
    return (
      <CustomerScreen
        rut={rut}
        setRut={setRut}
        name={name}
        setName={setName}
        onContinue={saveCustomer}
        onSkip={() => setScreen('checkout')}
      />
    );
  }

  if (screen === 'checkout') {
    return <CheckoutScreen total={total} amountPaid={amountPaid} setAmountPaid={setAmountPaid} onPay={pay} />;
  }

  if (screen === 'receipt') {
    return <ReceiptScreen payment={payment} onFinish={() => setScreen('success')} />;
  }

  return <SuccessScreen onRestart={() => setScreen('cover')} />;
}
