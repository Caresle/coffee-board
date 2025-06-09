export const QueriesBoardDetails = {
	insertOne: `
        INSERT INTO board_details (id_board, name, board_order, deleted)
        values ($1, $2, $3, $4)
        RETURNING *;
    `,
	updateOne: `
        UPDATE board_details
        SET name = $1, board_order = $2, deleted = $3
        WHERE id_board = $4
        RETURNING *;
    `,
	deleteOne: `
        UPDATE board_details
        SET deleted = 1
        WHERE id_board = $1
        RETURNING *;
    `,
}
