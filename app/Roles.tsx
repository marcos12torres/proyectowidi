import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Roles: React.FC = () => {
  const navigate = useNavigate();
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [teacherCode, setTeacherCode] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelection = async (role: string) => {
    if (role === 'profesor') {
      setShowTeacherModal(true);
      return;
    }

    try {
      const response = await fetch('/api/roles/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      setError('Error al guardar el rol');
    }
  };

  const handleTeacherVerification = async () => {
    try {
      const response = await fetch('/api/roles/verify-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: teacherCode }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        setError('Código de profesor inválido');
      }
    } catch (error) {
      setError('Error al verificar el código');
    }
  };

   // Estilos en línea
   const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '400px',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold' as const,
      textAlign: 'center' as const,
      marginBottom: '1.5rem',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
    button: (color: string, hoverColor: string) => ({
      width: '100%',
      padding: '1rem',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      backgroundColor: color,
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    }),
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      width: '300px',
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
    },
    errorMessage: {
      color: '#ef4444',
      textAlign: 'center' as const,
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Selecciona tu rol</h2>

        <div style={styles.buttons}>
          <button
            onClick={() => handleRoleSelection('alumno')}
            style={styles.button('#3b82f6', '#2563eb')}
          >
            Alumno
          </button>

          <button
            onClick={() => handleRoleSelection('profesor')}
            style={styles.button('#10b981', '#059669')}
          >
            Profesor
          </button>

          <button
            onClick={() => handleRoleSelection('padre')}
            style={styles.button('#8b5cf6', '#7c3aed')}
          >
            Padre
          </button>
        </div>

        {error && <p style={styles.errorMessage}>{error}</p>}
      </div>

      {showTeacherModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Verifica tu código de profesor</h3>
            <input
              type="text"
              placeholder="Ingresa el código"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <div style={styles.modalButtons}>
              <button
                onClick={handleTeacherVerification}
                style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', backgroundColor: '#3b82f6', color: 'white' }}
              >
                Aceptar
              </button>
              <button
                onClick={() => setShowTeacherModal(false)}
                style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', backgroundColor: '#ef4444', color: 'white' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
