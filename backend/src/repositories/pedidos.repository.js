
import { query } from '../db.js';

export async function listarTodos() {
  const { rows } = await query(
    'SELECT * FROM pedidos ORDER BY id ASC'
  );
  return rows;
}

export async function crear(datos) {
  const { rows } = await query(
    `INSERT INTO pedidos
      (cliente, mesero, producto, cantidad, mesa, estado)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      datos.cliente,
      datos.mesero,
      datos.producto,
      datos.cantidad,
      datos.mesa,
      datos.estado
    ]
  );
  return rows[0];
}

export async function actualizarEstado(id, estado) {
  const { rows } = await query(
    'UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING *',
    [estado, id]
  );
  return rows[0] ?? null;
}

export async function eliminar(id) {
  const { rowCount } = await query(
    'DELETE FROM pedidos WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}
