const contexts = new Map();

const PRODUCTS = [
  { id: '267658', name: 'EUCER.CAPILL.TRAT.REVI100', price: 19990 },
  { id: '267659', name: 'EUCER.DERMO.PACK.HIDRA', price: 25990 },
  { id: '267660', name: 'MAICAO.SHAMPOO.SUAVE', price: 8990 },
  { id: '267661', name: 'CRUZVERDE.GEL.LIMPIADOR', price: 7490 },
  { id: '267662', name: 'SUPERSANA.VITAMINA.C', price: 11990 },
];

const getTotal = (ctx) => ctx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(body));
};

const parseBody = (req) =>
  new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return json(res, 200, { ok: true });
  }

  const url = req.url || '/';
  const [path] = url.split('?');

  if (req.method === 'POST' && path === '/sale/context') {
    const contextId = Math.random().toString(36).slice(2, 12);
    contexts.set(contextId, { id: contextId, items: [], customer: null, status: 'open' });
    return json(res, 201, { contextId });
  }

  const ctxMatch = path.match(/^\/sale\/context\/([^/]+)$/);
  if (req.method === 'GET' && ctxMatch) {
    const ctx = contexts.get(ctxMatch[1]);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    return json(res, 200, ctx);
  }

  if (req.method === 'DELETE' && ctxMatch) {
    contexts.delete(ctxMatch[1]);
    return json(res, 200, { ok: true });
  }

  const searchMatch = path.match(/^\/sale\/products\/search\/([^/]+)\/([^/]+)$/);
  if (req.method === 'GET' && searchMatch) {
    const query = decodeURIComponent(searchMatch[1] || '').toUpperCase();
    const contextId = searchMatch[2];
    if (!contexts.has(contextId)) return json(res, 404, { message: 'Context not found' });
    const items = PRODUCTS.filter((p) => p.name.includes(query) || p.id.includes(query));
    return json(res, 200, { items, blockedCount: 0, contextId, query });
  }

  if (req.method === 'POST' && (path === '/sale/item' || path === '/sale/items')) {
    const body = await parseBody(req);
    const ctx = contexts.get(body.contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    const requestedId = body.productId || body.articleId;
    const product = PRODUCTS.find((p) => p.id === requestedId);
    if (!product) return json(res, 404, { message: 'Product not found' });
    const qty = Number(body.quantity || 1);
    const existing = ctx.items.find((i) => i.id === product.id);
    if (existing) existing.quantity += qty;
    else ctx.items.push({ ...product, quantity: qty });
    return json(res, 200, { contextId: body.contextId, items: ctx.items });
  }

  if (req.method === 'POST' && path === '/sale/items/clear') {
    const body = await parseBody(req);
    const ctx = contexts.get(body.contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    const requestedId = body.productId || body.articleId;
    const qty = Number(body.quantity || 1);
    const existing = ctx.items.find((i) => i.id === requestedId);
    if (existing) {
      existing.quantity = Math.max(0, existing.quantity - qty);
      ctx.items = ctx.items.filter((i) => i.quantity > 0);
    }
    return json(res, 200, { contextId: body.contextId, items: ctx.items, total: getTotal(ctx), status: ctx.status });
  }

  if (req.method === 'POST' && path === '/sale/customer') {
    const body = await parseBody(req);
    const ctx = contexts.get(body.contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    ctx.customer = { rut: body.rut || '', name: body.name || 'Cliente' };
    return json(res, 200, ctx);
  }

  if (req.method === 'GET' && path.startsWith('/sale/summary/')) {
    const contextId = path.split('/').pop();
    const ctx = contexts.get(contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    const total = getTotal(ctx);
    return json(res, 200, { contextId, customer: ctx.customer, items: ctx.items, total, status: ctx.status });
  }

  if (req.method === 'POST' && path.startsWith('/sale/totalize/')) {
    const contextId = path.split('/').pop();
    const ctx = contexts.get(contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    return json(res, 200, { contextId, customer: ctx.customer, items: ctx.items, total: getTotal(ctx), status: ctx.status });
  }

  if (req.method === 'GET' && path.startsWith('/sale/payment-methods/')) {
    const contextId = path.split('/').pop();
    const ctx = contexts.get(contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    return json(res, 200, {
      contextId,
      methods: [
        { id: 'cash', name: 'Efectivo' },
        { id: 'debit', name: 'Debito' },
        { id: 'credit', name: 'Credito' },
      ],
    });
  }

  if (req.method === 'POST' && path.startsWith('/sale/pay/')) {
    const contextId = path.split('/').pop();
    const ctx = contexts.get(contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    const total = getTotal(ctx);
    ctx.status = 'paid';
    return json(res, 200, { contextId, total, approved: true, receiptId: `R-${Date.now()}` });
  }

  if (req.method === 'POST' && path.startsWith('/sale/close/')) {
    const contextId = path.split('/').pop();
    const ctx = contexts.get(contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    ctx.status = 'closed';
    return json(res, 200, { contextId, closed: true });
  }

  if (req.method === 'POST' && (path === '/sale/cancel' || path.startsWith('/sale/cancel/'))) {
    const contextId = path.split('/').pop();
    if (!contextId || contextId === 'cancel') {
      return json(res, 200, { cancelled: false, reason: 'contextId required' });
    }
    const ctx = contexts.get(contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    ctx.status = 'cancelled';
    ctx.items = [];
    return json(res, 200, { contextId, cancelled: true });
  }

  if (req.method === 'POST' && path === '/sale/payment') {
    const body = await parseBody(req);
    const ctx = contexts.get(body.contextId);
    if (!ctx) return json(res, 404, { message: 'Context not found' });
    const total = ctx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const amountPaid = Number(body.amountPaid || 0);
    const change = Math.max(0, amountPaid - total);
    return json(res, 200, {
      contextId: body.contextId,
      method: body.method || 'cash',
      total,
      amountPaid,
      change,
      approved: amountPaid >= total,
      receiptId: `R-${Date.now()}`,
    });
  }

  if (req.method === 'POST' && path === '/evaluation/discount') {
    const body = await parseBody(req);
    const cartTotal = Number(body.cartTotal || 0);
    const discount = cartTotal >= 30000 ? Math.round(cartTotal * 0.1) : 0;
    return json(res, 200, {
      cartTotal,
      discount,
      payable: cartTotal - discount,
      rulesApplied: discount > 0 ? ['10_PERCENT_OVER_30000'] : [],
    });
  }

  if (req.method === 'POST' && path === '/sale/products/evaluate') {
    const body = await parseBody(req);
    const quantity = Number(body.quantity || 1);
    const product = body.product || {};
    const subtotal = Number(product.price || 0) * quantity;
    const hasCustomer = Boolean(body.customer);
    const discountRate = hasCustomer ? 0.1 : 0.05;
    const discount = Math.round(subtotal * discountRate);
    return json(res, 200, {
      quantity,
      subtotal,
      discount,
      total: subtotal - discount,
      hasCustomer,
      rulesApplied: [hasCustomer ? 'CUSTOMER_10' : 'NO_CUSTOMER_5'],
    });
  }

  return json(res, 404, { message: 'Not Found', path });
};
