
import * as pedidosRepository from '../repositories/pedidos.repository.js';

const ESTADOS_VALIDOS = ['Pendiente', 'En cocina', 'Entregado'];

// GET /api/pedidos
export async function listar(req, res) {
  try {
    const pedidos = await pedidosRepository.listarTodos();
    res.json(pedidos);
  } catch (err) {
    console.error('ERROR LISTAR PEDIDOS:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
}

// POST /api/pedidos
export async function crear(req, res) {
  const { cliente, mesero, producto, cantidad, mesa, estado } = req.body || {};

  if (
    typeof cliente !== 'string' || !cliente.trim() ||
    typeof mesero !== 'string' || !mesero.trim() ||
    typeof producto !== 'string' || !producto.trim()
  ) {
    return res.status(400).json({
      error: 'Cliente, mesero y producto son obligatorios'
    });
  }

  const cant = Number(cantidad);
  const mesaNum = Number(mesa);

  if (!Number.isInteger(cant) || cant <= 0) {
    return res.status(400).json({
      error: 'La cantidad debe ser un entero positivo'
    });
  }

  if (!Number.isInteger(mesaNum) || mesaNum <= 0) {
    return res.status(400).json({
      error: 'La mesa debe ser un entero positivo'
    });
  }

  const estadoFinal = estado || 'Pendiente';

  if (!ESTADOS_VALIDOS.includes(estadoFinal)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  try {
    const pedido = await pedidosRepository.crear({
      cliente: cliente.trim(),
      mesero: mesero.trim(),
      producto: producto.trim(),
      cantidad: cant,
      mesa: mesaNum,
      estado: estadoFinal
    });

    res.status(201).json(pedido);
  } catch (err) {
    console.error('ERROR CREAR PEDIDO:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
}

// PATCH /api/pedidos/:id/estado
export async function actualizarEstado(req, res) {
  const { id } = req.params;
  const { estado } = req.body || {};

  if (!ESTADOS_VALIDOS.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  try {
    const pedido = await pedidosRepository.actualizarEstado(id, estado);

    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }

    res.json(pedido);
  } catch (err) {
    console.error('ERROR ACTUALIZAR ESTADO:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
}

// DELETE /api/pedidos/:id
export async function eliminar(req, res) {
  const { id } = req.params;

  try {
    const eliminado = await pedidosRepository.eliminar(id);

    if (!eliminado) {
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }

    res.status(204).end();
  } catch (err) {
    console.error('ERROR ELIMINAR PEDIDO:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
