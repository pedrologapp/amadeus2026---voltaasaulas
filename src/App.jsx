import React, { useState } from 'react';
import { supabase } from './supabaseClient';

// Ícones inline (SVG) para não depender de lucide-react
const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  )
};

// CSS inline para o componente
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .volta-aulas-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    position: relative;
    overflow-x: hidden;
  }

  .volta-aulas-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 30%);
    pointer-events: none;
    z-index: 0;
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Header */
  .header {
    text-align: center;
    padding: 40px 20px;
    color: white;
    max-width: 800px;
    animation: fadeInDown 0.8s ease-out;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .logo-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    padding: 16px 32px;
    border-radius: 50px;
    margin-bottom: 24px;
    border: 1px solid rgba(255,255,255,0.3);
  }

  .logo-text {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .main-title {
    font-family: 'Quicksand', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    margin-bottom: 16px;
    text-shadow: 0 4px 30px rgba(0,0,0,0.2);
    line-height: 1.2;
  }

  .main-title span {
    display: block;
    font-size: 0.5em;
    font-weight: 400;
    opacity: 0.9;
    margin-top: 8px;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.95;
    max-width: 500px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }

  /* Info Cards */
  .info-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .info-card {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    padding: 12px 20px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.2);
    font-size: 0.95rem;
    transition: transform 0.2s, background 0.2s;
  }

  .info-card:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.2);
  }

  /* Aviso importante */
  .aviso-importante {
    background: rgba(255,193,7,0.2);
    border: 2px solid rgba(255,193,7,0.5);
    border-radius: 12px;
    padding: 16px 24px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 500px;
  }

  .aviso-importante svg {
    flex-shrink: 0;
  }

  .aviso-importante p {
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* Main Card */
  .main-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 25px 80px rgba(0,0,0,0.2);
    max-width: 550px;
    width: 100%;
    overflow: hidden;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-header {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    padding: 28px 32px;
    color: white;
    text-align: center;
  }

  .card-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .card-header p {
    opacity: 0.9;
    font-size: 0.95rem;
  }

  .badge-gratuito {
    display: inline-block;
    background: #10b981;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 12px;
  }

  .card-body {
    padding: 32px;
  }

  /* Form Styles */
  .form-group {
    margin-bottom: 24px;
  }

  .form-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  .form-label span {
    color: #ef4444;
  }

  .input-wrapper {
    position: relative;
  }

  .input-wrapper svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }

  .form-input {
    width: 100%;
    padding: 14px 14px 14px 46px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    transition: all 0.2s;
    background: #f9fafb;
  }

  .form-input:focus {
    outline: none;
    border-color: #7c3aed;
    background: white;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
  }

  .form-input::placeholder {
    color: #9ca3af;
  }

  .form-input.selected {
    border-color: #10b981;
    background: #f0fdf4;
  }

  .form-input:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
    color: #6b7280;
  }

  /* Dropdown */
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 2px solid #e5e7eb;
    border-top: none;
    border-radius: 0 0 12px 12px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 100;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }

  .dropdown-item {
    padding: 14px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
    transition: background 0.15s;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .dropdown-item:hover {
    background: #f3f4f6;
  }

  .dropdown-item-name {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 4px;
  }

  .dropdown-item-info {
    font-size: 0.8rem;
    color: #6b7280;
  }

  /* Selected Student */
  .selected-student {
    background: #f0fdf4;
    border: 2px solid #10b981;
    border-radius: 12px;
    padding: 14px 16px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .selected-student-info {
    display: flex;
    flex-direction: column;
  }

  .selected-student-name {
    font-weight: 600;
    color: #065f46;
    font-size: 0.95rem;
  }

  .selected-student-details {
    font-size: 0.8rem;
    color: #047857;
    margin-top: 2px;
  }

  .btn-clear {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-clear:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  /* Loading */
  .loading-spinner {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 2px solid #e5e7eb;
    border-top-color: #7c3aed;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: translateY(-50%) rotate(360deg); }
  }

  /* No results */
  .no-results {
    background: #fef3c7;
    border: 1px solid #fbbf24;
    border-radius: 10px;
    padding: 12px 16px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    color: #92400e;
  }

  .hint-text {
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 6px;
  }

  /* Submit Button */
  .btn-submit {
    width: 100%;
    padding: 16px 24px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }

  .btn-submit:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
  }

  .btn-submit .loading-spinner-white {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Success Screen */
  .success-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .success-card {
    background: white;
    border-radius: 24px;
    padding: 48px 40px;
    text-align: center;
    max-width: 450px;
    width: 100%;
    box-shadow: 0 25px 80px rgba(0,0,0,0.15);
    animation: scaleIn 0.5s ease-out;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .success-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: white;
    animation: bounce 0.6s ease-out 0.3s both;
  }

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .success-card h2 {
    color: #065f46;
    font-size: 1.8rem;
    margin-bottom: 12px;
  }

  .success-card p {
    color: #6b7280;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  .success-details {
    background: #f0fdf4;
    border-radius: 12px;
    padding: 20px;
    margin: 24px 0;
    text-align: left;
  }

  .success-details p {
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  .success-details strong {
    color: #065f46;
  }

  .btn-back {
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-back:hover {
    background: #e5e7eb;
  }

  /* Footer */
  .footer {
    text-align: center;
    padding: 32px 20px;
    color: rgba(255,255,255,0.8);
    font-size: 0.85rem;
  }

  .footer a {
    color: white;
    text-decoration: none;
  }

  /* Responsivo */
  @media (max-width: 600px) {
    .content-wrapper {
      padding: 16px;
    }
    
    .header {
      padding: 30px 16px;
    }
    
    .main-title {
      font-size: 2rem;
    }
    
    .card-body {
      padding: 24px 20px;
    }
    
    .info-cards {
      flex-direction: column;
      align-items: center;
    }
    
    .info-card {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
`;

function VoltaAsAulas2026() {
  // Estados do formulário
  const [formData, setFormData] = useState({
    studentName: '',
    studentGrade: '',
    studentClass: '',
    studentTurno: '',
    parentName: '',
    phone: ''
  });

  // Estados para busca de alunos
  const [studentSearch, setStudentSearch] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Estados de controle
  const [isProcessing, setIsProcessing] = useState(false);
  const [inscriptionSuccess, setInscriptionSuccess] = useState(false);

  // Função para buscar alunos no Supabase (SEM filtro de turno)
  const searchStudents = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setStudentsList([]);
      setShowStudentDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .ilike('nome_completo', `%${searchTerm}%`)
        .order('nome_completo')
        .limit(10);

      if (error) throw error;
      
      setStudentsList(data || []);
      setShowStudentDropdown(data && data.length > 0);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      setStudentsList([]);
      setShowStudentDropdown(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Selecionar um aluno
  const selectStudent = (student) => {
    setSelectedStudent(student);
    setFormData(prev => ({
      ...prev,
      studentName: student.nome_completo,
      studentGrade: student.serie,
      studentClass: student.turma,
      studentTurno: student.turno
    }));
    setStudentSearch(student.nome_completo);
    setShowStudentDropdown(false);
    setStudentsList([]);
  };

  // Mudança no campo de busca
  const handleStudentSearchChange = (e) => {
    const value = e.target.value;
    setStudentSearch(value);
    searchStudents(value);
    
    if (!value) {
      clearStudentSelection();
    }
  };

  // Limpar seleção
  const clearStudentSelection = () => {
    setSelectedStudent(null);
    setStudentSearch('');
    setFormData(prev => ({
      ...prev,
      studentName: '',
      studentGrade: '',
      studentClass: '',
      studentTurno: ''
    }));
    setShowStudentDropdown(false);
    setStudentsList([]);
  };

  // Mudança nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Máscara de telefone
      const phoneValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
      setFormData(prev => ({ ...prev, [name]: phoneValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Validação
  const validateForm = () => {
    if (!selectedStudent) {
      alert('Por favor, selecione um aluno da lista.');
      return false;
    }
    if (!formData.parentName.trim()) {
      alert('Por favor, informe o nome do responsável.');
      return false;
    }
    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) {
      alert('Por favor, informe um telefone válido.');
      return false;
    }
    return true;
  };

  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);

    try {
      const response = await fetch('https://webhook.escolaamadeus.com/webhook/amadeuseventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: formData.studentName,
          studentGrade: formData.studentGrade,
          studentClass: formData.studentClass,
          studentTurno: formData.studentTurno,
          parentName: formData.parentName,
          phone: formData.phone,
          timestamp: new Date().toISOString(),
          event: 'volta-as-aulas-2026'
        })
      });

      if (response.ok) {
        setInscriptionSuccess(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao enviar dados. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar confirmação. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Tela de sucesso
  if (inscriptionSuccess) {
    return (
      <>
        <style>{styles}</style>
        <div className="volta-aulas-container">
          <div className="success-screen">
            <div className="success-card">
              <div className="success-icon">
                <Icons.Check />
              </div>
              <h2>Presença Confirmada!</h2>
              <p>Sua confirmação foi registrada com sucesso.</p>
              
              <div className="success-details">
                <p><strong>Aluno:</strong> {formData.studentName}</p>
                <p><strong>Série:</strong> {formData.studentGrade} - Turma {formData.studentClass}</p>
                <p><strong>Turno:</strong> {formData.studentTurno}</p>
                <p><strong>Responsável:</strong> {formData.parentName}</p>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                📅 Aguardamos você no dia <strong>24/01/2026</strong> às <strong>14h</strong>
              </p>
              
              <button 
                className="btn-back" 
                onClick={() => window.location.reload()}
                style={{ marginTop: '24px' }}
              >
                Nova Confirmação
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="volta-aulas-container">
        <div className="content-wrapper">
          
          {/* Header */}
          <header className="header">
            <div className="logo-container">
              <Icons.GraduationCap />
              <span className="logo-text" style={{ marginLeft: '10px' }}>ESCOLA AMADEUS</span>
            </div>
            
            <h1 className="main-title">
              Volta às Aulas 2026
              <span>Reunião de Pais e Responsáveis</span>
            </h1>
            
            <p className="subtitle">
              Confirme sua presença na nossa reunião de início do ano letivo. 
              É rápido e gratuito!
            </p>
            
            <div className="info-cards">
              <div className="info-card">
                <Icons.Calendar />
                <span>24 de Janeiro de 2026</span>
              </div>
              <div className="info-card">
                <Icons.Clock />
                <span>14h às 17h</span>
              </div>
              <div className="info-card">
                <Icons.MapPin />
                <span>Escola Amadeus</span>
              </div>
            </div>

            <div className="aviso-importante">
              <Icons.Info />
              <p>⚠️ Este evento é <strong>APENAS</strong> para pais e responsáveis. Pedimos que não tragam os filhos.</p>
            </div>
          </header>

          {/* Formulário */}
          <div className="main-card">
            <div className="card-header">
              <h2>
                <Icons.Users />
                Confirmação de Presença
              </h2>
              <p>Preencha os dados abaixo</p>
              <div className="badge-gratuito">✓ Gratuito</div>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                {/* Busca de Aluno */}
                <div className="form-group">
                  <label className="form-label">
                    Nome do Aluno <span>*</span>
                  </label>
                  <div className="input-wrapper">
                    <Icons.Search />
                    <input
                      type="text"
                      className={`form-input ${selectedStudent ? 'selected' : ''}`}
                      value={studentSearch}
                      onChange={handleStudentSearchChange}
                      onFocus={() => studentsList.length > 0 && setShowStudentDropdown(true)}
                      placeholder="Digite o nome do aluno para buscar..."
                      autoComplete="off"
                    />
                    {isSearching && <div className="loading-spinner"></div>}
                    
                    {/* Dropdown de resultados */}
                    {showStudentDropdown && studentsList.length > 0 && !selectedStudent && (
                      <div className="dropdown">
                        {studentsList.map((student) => (
                          <div
                            key={student.id}
                            className="dropdown-item"
                            onClick={() => selectStudent(student)}
                          >
                            <div className="dropdown-item-name">{student.nome_completo}</div>
                            <div className="dropdown-item-info">
                              {student.serie} - Turma {student.turma} - {student.turno}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Aluno selecionado */}
                  {selectedStudent && (
                    <div className="selected-student">
                      <div className="selected-student-info">
                        <span className="selected-student-name">✓ {selectedStudent.nome_completo}</span>
                        <span className="selected-student-details">
                          {selectedStudent.serie} - Turma {selectedStudent.turma} - {selectedStudent.turno}
                        </span>
                      </div>
                      <button type="button" className="btn-clear" onClick={clearStudentSelection}>
                        <Icons.X />
                      </button>
                    </div>
                  )}

                  {/* Nenhum resultado */}
                  {studentSearch.length >= 2 && studentsList.length === 0 && !selectedStudent && !isSearching && (
                    <div className="no-results">
                      <Icons.AlertTriangle />
                      <span>Nenhum aluno encontrado. Verifique o nome digitado.</span>
                    </div>
                  )}

                  {studentSearch.length > 0 && studentSearch.length < 2 && (
                    <p className="hint-text">Digite pelo menos 2 letras para buscar</p>
                  )}
                </div>

                {/* Nome do Responsável */}
                <div className="form-group">
                  <label className="form-label">
                    Nome do Responsável <span>*</span>
                  </label>
                  <div className="input-wrapper">
                    <Icons.User />
                    <input
                      type="text"
                      name="parentName"
                      className="form-input"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      placeholder="Nome completo do responsável"
                      required
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div className="form-group">
                  <label className="form-label">
                    Telefone / WhatsApp <span>*</span>
                  </label>
                  <div className="input-wrapper">
                    <Icons.Phone />
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(84) 99999-9999"
                      required
                    />
                  </div>
                </div>

                {/* Botão de Envio */}
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isProcessing || !selectedStudent}
                >
                  {isProcessing ? (
                    <>
                      <div className="loading-spinner-white"></div>
                      Confirmando...
                    </>
                  ) : (
                    <>
                      <Icons.Check />
                      CONFIRMAR PRESENÇA
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <footer className="footer">
            <p>© 2026 Escola Centro Educacional Amadeus</p>
            <p style={{ marginTop: '8px', opacity: 0.7 }}>
              São Gonçalo do Amarante - RN
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}

export default VoltaAsAulas2026;
