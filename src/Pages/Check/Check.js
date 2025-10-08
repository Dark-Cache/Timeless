import React, { useState, useEffect } from "react";
import "./Check.css";
import { useNavigate } from "react-router-dom";
import { VscCreditCard } from "react-icons/vsc";

// Helper: extract numeric price from "₦50,000.00"
const parsePrice = (priceStr) => {
  const numStr = priceStr.replace(/[^\d.]/g, "");
  return parseFloat(numStr) || 0;
};

// Helper: format number as NGN currency
const formatNGN = (value) => {
  return value.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    if (savedCart.length === 0) {
      navigate("/cart");
    }
  }, [navigate]);

  // Form state
  const [contact, setContact] = useState({
    email: "",
    subscribe: false,
  });

  const [shipping, setShipping] = useState({
    country: "Nigeria",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Lagos",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });

  const [billing, setBilling] = useState({
    sameAsShipping: true,
    country: "Nigeria",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Lagos",
    postalCode: "",
    phone: "",
  });

  const [shippingMethod] = useState("standard");

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = 8600; // ₦8,600.00
  const total = subtotal + shippingCost;

  // Handlers
  const handleContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingSameChange = (e) => {
    setBilling((prev) => ({
      ...prev,
      sameAsShipping: e.target.checked,
    }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  // Stripe redirect (simulated for now)
  const handlePayNow = async () => {
    if (!contact.email) {
      alert("Please enter your email or phone number.");
      return;
    }
    if (!shipping.address || !shipping.city || !shipping.state) {
      alert("Please fill in your shipping address.");
      return;
    }

    // Simulate sending to backend
    console.log("Order data:", {
      contact,
      shipping: shipping,
      billing: billing.sameAsShipping ? shipping : billing,
      shippingMethod,
      lineItems: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: parsePrice(item.price),
      })),
      subtotal,
      shippingCost,
      total,
    });

    alert("Redirecting to Stripe... (No backend yet)");
    // In production, replace this with:
    // const session = await fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify(orderData) })
    // window.location = session.url;
  };

  return (
    <div className="checkout-page">
      

      <div className="checkout-layout">
        {/* Left Column: Form */}
        <div className="checkout-form">
          {/* Contact */}
          <section className="form-section">
            <h2>Contact</h2>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleContactChange}
                placeholder="Email or mobile phone number"
              />
            </div>
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="subscribe"
                name="subscribe"
                checked={contact.subscribe}
                onChange={handleContactChange}
              />
              <label htmlFor="subscribe">Email me with news and offers</label>
            </div>
          </section>

          <hr className="form-divider" />

          {/* Delivery */}
          <section className="form-section">
            <h2>Delivery</h2>
            <div className="form-group">
              <select
                id="country"
                name="country"
                value={shipping.country}
                onChange={handleShippingChange}
              >
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={shipping.firstName}
                  onChange={handleShippingChange}
                  placeholder="First name (optional)"
                />
              </div>
              <div className="form-group half">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={shipping.lastName}
                  onChange={handleShippingChange}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                value={shipping.address}
                onChange={handleShippingChange}
                placeholder="Address"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={shipping.apartment}
                onChange={handleShippingChange}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>

            <div className="form-row">
              <div className="form-group third">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-group third">
                <select
                  id="state"
                  name="state"
                  value={shipping.state}
                  onChange={handleShippingChange}
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Abuja">Abuja</option>
                </select>
              </div>
              <div className="form-group third">
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shipping.postalCode}
                  onChange={handleShippingChange}
                  placeholder="Postal code (optional)"
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="phone"
                name="phone"
                value={shipping.phone}
                onChange={handleShippingChange}
                placeholder="Phone"
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={shipping.saveInfo}
                onChange={(e) =>
                  setShipping((prev) => ({
                    ...prev,
                    saveInfo: e.target.checked,
                  }))
                }
              />
              <label htmlFor="saveInfo">Save this information for next time</label>
            </div>
          </section>

          <hr className="form-divider" />

          {/* Shipping Method */}
          <section className="form-section">
            <h2>Shipping method</h2>
            <div className="shipping-option">
              <input
                type="radio"
                id="standard"
                name="shippingMethod"
                value="standard"
                checked={shippingMethod === "standard"}
                readOnly
              />
              <label htmlFor="standard">
                <span className="shipping-name">Standard</span>
                <span className="shipping-price">{formatNGN(shippingCost)}</span>
              </label>
            </div>
          </section>

          <hr className="form-divider" />

          {/* Payment */}
          <section className="form-section">
            <h2>Payment</h2>
            <div className="payment-method">
              <div className="payment-header">
                <span>Stripe</span>
              </div>
              <p className="payment-note">
                All transactions are secure and encrypted.
              </p>
              <div className="payment-redirect-box">
                <VscCreditCard className="atm"  />
                <p>
                  After clicking “Pay now”, you will be redirected to Stripe to complete your purchase securely.
                </p>
              </div>
            </div>
          </section>

          <hr className="form-divider" />

          {/* Billing Address */}
          <section className="form-section">
            <h2>Billing address</h2>
            <div className="form-radio-group">
              <div className="form-radio">
                <input
                  type="radio"
                  id="sameAsShipping"
                  name="billingAddress"
                  checked={billing.sameAsShipping}
                  onChange={handleBillingSameChange}
                />
                <label htmlFor="sameAsShipping">Same as shipping address</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="differentBilling"
                  name="billingAddress"
                  checked={!billing.sameAsShipping}
                  onChange={() => setBilling((prev) => ({ ...prev, sameAsShipping: false }))} // uncheck sameAsShipping
                />
                <label htmlFor="differentBilling">Use a different billing address</label>
              </div>
            </div>

            {!billing.sameAsShipping && (
              <div className="billing-form">
                <div className="form-group">
                  <select
                    id="billCountry"
                    name="country"
                    value={billing.country}
                    onChange={handleBillingChange}
                  >
                    <option value="Nigeria">Nigeria</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <input
                      type="text"
                      id="billFirstName"
                      name="firstName"
                      value={billing.firstName}
                      onChange={handleBillingChange}
                      placeholder="First name (optional)"
                    />
                  </div>
                  <div className="form-group half">
                    <input
                      type="text"
                      id="billLastName"
                      name="lastName"
                      value={billing.lastName}
                      onChange={handleBillingChange}
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="billAddress"
                    name="address"
                    value={billing.address}
                    onChange={handleBillingChange}
                    placeholder="Address"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="billApartment"
                    name="apartment"
                    value={billing.apartment}
                    onChange={handleBillingChange}
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group third">
                    <input
                      type="text"
                      id="billCity"
                      name="city"
                      value={billing.city}
                      onChange={handleBillingChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group third">
                    <select
                      id="billState"
                      name="state"
                      value={billing.state}
                      onChange={handleBillingChange}
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Abuja">Abuja</option>
                    </select>
                  </div>
                  <div className="form-group third">
                    <input
                      type="text"
                      id="billPostalCode"
                      name="postalCode"
                      value={billing.postalCode}
                      onChange={handleBillingChange}
                      placeholder="Postal code (optional)"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="billPhone"
                    name="phone"
                    value={billing.phone}
                    onChange={handleBillingChange}
                    placeholder="Phone (optional)"
                  />
                </div>
              </div>
            )}
          </section>

          <button className="pay-now-btn" onClick={handlePayNow}>
            Pay now
          </button>
        </div>

        {/* Right Column: Order Summary */}
        <div className="order-summary">
          <div className="summary-item">
            <img
              src={cartItems[0]?.image || "https://via.placeholder.com/60"}
              alt={cartItems[0]?.name || "Product"}
              className="item-image"
            />
            <div className="item-info">
              <div className="item-name">{cartItems[0]?.name || "Item Name"}</div>
              <div className="item-meta">S</div>
            </div>
            <div className="item-price">
              {formatNGN(cartItems[0] ? parsePrice(cartItems[0].price) : 0)}
            </div>
          </div>

          <div className="discount-section">
            <input
              type="text"
              placeholder="Discount code"
              className="discount-input"
            />
            <button className="apply-btn">Apply</button>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatNGN(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{formatNGN(shippingCost)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatNGN(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;