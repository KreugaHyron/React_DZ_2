import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const CulinaryChronicle = ({ initialData }) => {
    const [currentSnapshot, setSnapshot] = useState(initialData);
    const [isBlueprintActive, setBlueprintActive] = useState(false);
    const [draftSchema, setDraftSchema] = useState(initialData);

    const updateDraftSchema = (e) => {
        const { name, value } = e.target;
        setDraftSchema(prevData => ({
            ...prevData,
            [name]: name === 'rating' ? parseFloat(value) : value,
        }));
    };

    const commitChanges = () => {
        setSnapshot(draftSchema);
        setBlueprintActive(false);
        alert(`Хроніку "${draftSchema.name}" успішно зафіксовано.`);
    };

    const rollBack = () => {
        setDraftSchema(currentSnapshot);
        setBlueprintActive(false);
    };

    const startBlueprint = () => {
        setDraftSchema(currentSnapshot);
        setBlueprintActive(true);
    };

    return (
        <div className="card-container culinary-chronicle-card">
            <h2>{currentSnapshot.name}</h2>

            <img
                src={currentSnapshot.imageSource}
                alt={`Зображення фасаду ${currentSnapshot.name}`}
                className="eatery-visual"
            />

            {isBlueprintActive ? (
                <fieldset className="blueprint-field-set">
                    <legend style={{ fontWeight: 'bold', padding: '0 10px' }}>Активація Схеми</legend>
                    <label className="form-element-label">Назва (Ідентифікатор):
                        <input type="text" name="name" value={draftSchema.name} onChange={updateDraftSchema} className="form-data-input" />
                    </label>
                    <label className="form-element-label">Розташування:
                        <input type="text" name="location" value={draftSchema.location} onChange={updateDraftSchema} className="form-data-input" />
                    </label>
                    <label className="form-element-label">Оцінка (0-5):
                        <input type="number" name="stars" value={draftSchema.stars} onChange={updateDraftSchema} min="0" max="5" step="0.1" className="form-data-input" />
                    </label>
                    <label className="form-element-label">Палітра Смаків:
                        <input type="text" name="kitchenStyle" value={draftSchema.kitchenStyle} onChange={updateDraftSchema} className="form-data-input" />
                    </label>

                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <button onClick={commitChanges} className="cmd-btn cmd-commit">Зафіксувати</button>
                        <button onClick={rollBack} className="cmd-btn cmd-dismiss">Скасувати</button>
                    </div>
                </fieldset>
            ) : (
                <div>
                    <p><strong>Адреса:</strong> {currentSnapshot.location}</p>
                    <p><strong>Оцінка (Поточна):</strong> {currentSnapshot.stars.toFixed(1)} / 5.0 ⭐</p>
                    <p><strong>Спеціалізація:</strong> {currentSnapshot.kitchenStyle}</p>

                    <button onClick={startBlueprint} className="cmd-btn cmd-engage" style={{ marginTop: '10px' }}>Розпочати Редагування</button>
                </div>
            )}
        </div>
    );
};

CulinaryChronicle.propTypes = {
    initialData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        stars: PropTypes.number.isRequired,
        kitchenStyle: PropTypes.string.isRequired,
        imageSource: PropTypes.string.isRequired,
    }).isRequired,
};


const AccessVault = () => {
    const [keystoneCredentials, setKeystone] = useState({ accountName: '', secretKey: '' });
    const [isSecretDisclosed, setSecretDisclosed] = useState(false);
    const [isVaultSealed, setVaultSealed] = useState(false);

    const updateKeystone = (e) => {
        const { name, value } = e.target;
        setKeystone(prev => ({ ...prev, [name]: value }));
    };

    const sealVault = (e) => {
        e.preventDefault();

        if (!keystoneCredentials.accountName || !keystoneCredentials.secretKey) {
            alert('Потрібно заповнити обидва ключових поля.');
            return;
        }

        console.log('Ключі збережено:', keystoneCredentials);
        setVaultSealed(true);
    };

    const unsealVault = () => {
        setVaultSealed(false);
    };

    const toggleSecretVisibility = () => {
        setSecretDisclosed(prev => !prev);
    };

    return (
        <div className="card-container access-vault-card">
            <h4>{isVaultSealed ? 'Збережені Ключі Доступу' : 'Конфігурація Сховища'}</h4>

            {isVaultSealed ? (
                <div style={{textAlign: 'left'}}>
                    <p><strong>Ім'я Агента:</strong> {keystoneCredentials.accountName}</p>
                    <p style={{marginBottom: '20px'}}>
                        <strong>Секретний Код:</strong> {isSecretDisclosed ? keystoneCredentials.secretKey : '••••••••••••'}
                        <button
                            onClick={toggleSecretVisibility}
                            className="cmd-btn cmd-toggle"
                        >
                            {isSecretDisclosed ? 'Приховати' : 'Показати'}
                        </button>
                    </p>
                    <button
                        onClick={unsealVault}
                        className="cmd-btn cmd-vault"
                    >
                        Змінити Код
                    </button>
                </div>
            ) : (
                <form onSubmit={sealVault} style={{textAlign: 'left'}}>
                    <label className="form-element-label">Ім'я Агента (Логін):</label>
                    <input
                        type="text"
                        name="accountName"
                        value={keystoneCredentials.accountName}
                        onChange={updateKeystone}
                        required
                        className="form-data-input"
                        placeholder="Унікальний ідентифікатор"
                    />

                    <label className="form-element-label">Секретний Код (Пароль):</label>
                    <div className="input-container">
                        <input
                            type={isSecretDisclosed ? 'text' : 'password'}
                            name="secretKey"
                            value={keystoneCredentials.secretKey}
                            onChange={updateKeystone}
                            required
                            className="form-data-input"
                            placeholder="Складний ключ"
                        />
                        <button
                            type="button"
                            onClick={toggleSecretVisibility}
                            className="cmd-btn cmd-toggle"
                            style={{position: 'absolute', right: '5px', top: '35px'}}
                        >
                            {isSecretDisclosed ? '👁️' : '🔒'}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="cmd-btn cmd-lock"
                        style={{ marginTop: '10px' }}
                    >
                        Встановити та Запечатати
                    </button>
                </form>
            )}
        </div>
    );
};

AccessVault.propTypes = {};


const uniqueEateryData = {
    name: "Мідний Котел",
    location: "Площа Ідей, 42, м. Львів",
    stars: 4.2,
    kitchenStyle: "Ф'южн, Крафтова пивоварня",
    imageSource: "https://via.placeholder.com/450x250/3b5998/FFFFFF?text=Eatery+Facade+Visual"
};

function App() {
    return (
        <div className="App">
            <h1 >Завдання</h1>

            <h2 >Секція I: Кулінарна Хроніка (Ресторан)</h2>
            <CulinaryChronicle initialData={uniqueEateryData} />

            <hr style={{ margin: '60px auto', borderColor: '#ccc', width: '80%' }} />

            <h2 >Секція II: Сховище Доступу (Аутентифікація)</h2>
            <AccessVault />
        </div>
    );
}

export default App;
