'use client'
export default function Page() {
	return <>
		<div className="cart-container flex justify-center">
			<table className="cart-table">
				<thead>
					<tr>
						<th>SN</th>
						<th>Name</th>
						<th>Category</th>
						<th>Quantity</th>
						<th>Amount</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Banana Plant</td>
						<td>Fruits</td>
						<td>
							<div className="product-quantity">
								<button className="btn minus">
									<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
										<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
									</svg>
								</button>
								<input type="number" name="prod-quantity" id="" value="12" className="text-center text-lg" />
								<button className="btn plus">
									<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
										<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
									</svg>
								</button>
							</div>
						</td>
						<td className="text-right">250</td>
						<td className="text-right">500</td>
					</tr>
					<tr>
						<td>1</td>
						<td>Banana Plant</td>
						<td>Fruits</td>
						<td>2</td>
						<td className="text-right">250</td>
						<td className="text-right">500</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>Sub Total</td>
						<td className="text-right">500</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</>
}