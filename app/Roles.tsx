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