const TAX_RATE = 0.15;
const DISCOUNT_RATE = 0.10;

document.addEventListener("DOMContentLoaded", () => {
    const invoice = JSON.parse(localStorage.getItem("LatestInvoice"));

    if (!invoice || !Array.isArray(invoice.items) || invoice.items.length === 0) {
        alert("No invoice found.");
        window.location.href = "products.html";
        return;
    }

    // Fill invoice info
    document.getElementById("inv-number").innerText = invoice.invoiceNumber;
    document.getElementById("inv-date").innerText = invoice.date;
    document.getElementById("inv-trn").innerText = invoice.trn;

    document.getElementById("ship-name").innerText = invoice.shipping?.name || "";
    document.getElementById("ship-address").innerText = invoice.shipping?.address || "";

    const itemsContainer = document.getElementById("inv-items");
    itemsContainer.innerHTML = "";

    let subtotal = 0;
    let taxTotal = 0;
    let grandTotal = 0;

    invoice.items.forEach(item => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;

        const itemSubtotal = price * quantity;
        const discount = itemSubtotal * DISCOUNT_RATE;
        const taxedAmount = (itemSubtotal - discount) * TAX_RATE;
        const total = itemSubtotal - discount + taxedAmount;

        subtotal += itemSubtotal - discount;
        taxTotal += taxedAmount;
        grandTotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name || "Unnamed Item"}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td>$${discount.toFixed(2)}</td>
            <td>$${taxedAmount.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
        `;
        itemsContainer.appendChild(row);
    });

    document.getElementById("inv-subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("inv-tax").innerText = taxTotal.toFixed(2);
    document.getElementById("inv-total").innerText = grandTotal.toFixed(2);
});





