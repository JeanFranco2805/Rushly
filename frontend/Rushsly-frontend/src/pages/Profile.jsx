import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { usersApi } from "@/api/users";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user, login, logout, updateUser } = useUser();

  return (
    <div className={styles.page}>
      <div className="container">
        {user ? (
          <AccountView user={user} onLogout={logout} onUpdate={updateUser} />
        ) : (
          <AuthView onLogin={login} />
        )}
      </div>
    </div>
  );
}

function AuthView({ onLogin }) {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (mode === "signup") {
        await usersApi.create({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address: null,
        });
      }
      onLogin({ name: form.name || form.email.split("@")[0], email: form.email });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authLayout}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className={styles.authSubtitle}>
            {mode === "signin"
              ? "Sign in to manage your orders and preferences."
              : "Join Rushly for fast, reliable delivery."}
          </p>
        </div>

        <div className={styles.form}>
          {mode === "signup" && (
            <Input
              label="Full name"
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={set("name")}
            />
          )}

          <Input
            label="Email address"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={set("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={set("password")}
          />

          {mode === "signup" && (
            <Input
              label="Phone number"
              type="tel"
              placeholder="(00) 00000-0000"
              value={form.phone}
              onChange={set("phone")}
            />
          )}

          {error && <p className={styles.errorMsg}>{error}</p>}

          <Button fullWidth size="lg" loading={loading} onClick={handleSubmit}>
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </div>

        <div className={styles.authSwitch}>
          {mode === "signin" ? (
            <>
              <span>New to Rushly?</span>
              <button
                className={styles.switchButton}
                onClick={() => setMode("signup")}
              >
                Create account
              </button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <button
                className={styles.switchButton}
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function AccountView({ user, onLogout, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    onUpdate(form);
    setEditMode(false);
  };

  return (
    <div className={styles.accountLayout}>
      <div className={styles.accountHeader}>
        <div className={styles.avatar}>
          {user.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className={styles.accountName}>{user.name}</h1>
          <p className={styles.accountEmail}>{user.email}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onLogout}
          className={styles.logoutBtn}
        >
          Sign out
        </Button>
      </div>

      <div className={styles.sections}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Personal information</h2>
            {!editMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </div>

          {editMode ? (
            <div className={styles.form}>
              <Input
                label="Full name"
                value={form.name}
                onChange={set("name")}
              />
              <Input
                label="Email address"
                type="email"
                value={form.email}
                onChange={set("email")}
              />
              <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={set("phone")}
              />
              <div className={styles.formActions}>
                <Button size="sm" onClick={handleSave}>
                  Save changes
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.infoGrid}>
              <InfoRow label="Name" value={user.name} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone" value={user.phone || "Not provided"} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
}
