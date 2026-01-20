import React, { useState } from 'react';
import { supabase } from './supabaseClient';

// CSS minimalista e profissional com fundo azul
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e40af 100%);
    color: #111;
  }

  /* Header */
  .header {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #eaeaea;
    padding: 16px 24px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-weight: 600;
    font-size: 1rem;
    color: #1e3a5f;
    letter-spacing: -0.3px;
  }

  .header-badge {
    font-size: 0.75rem;
    color: #1e40af;
    background: #dbeafe;
    padding: 6px 12px;
    border-radius: 100px;
    font-weight: 500;
  }

  /* Main */
  .main {
    max-width: 580px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Hero Section */
  .hero {
    text-align: center;
    margin-bottom: 40px;
  }

  .event-tag {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #fff;
    background: rgba(255,255,255,0.2);
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
  }

  .hero h1 {
    font-size: 2.25rem;
    font-weight: 700;
    letter-spacing: -1px;
    line-height: 1.2;
    margin-bottom: 12px;
    color: #fff;
  }

  .hero-subtitle {
    font-size: 1rem;
    color: rgba(255,255,255,0.9);
    font-weight: 400;
    margin-bottom: 32px;
  }

  /* Event Info */
  .event-info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 32px;
  }

  .info-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: #1e3a5f;
    background: rgba(255,255,255,0.95);
    border: 1px solid rgba(255,255,255,0.3);
    padding: 10px 16px;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .info-pill svg {
    width: 16px;
    height: 16px;
    color: #2563eb;
  }

  /* O que esperar - Card de destaques */
  .highlights-card {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    text-align: left;
  }

  .highlights-card h3 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e3a5f;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .highlights-card h3 svg {
    width: 18px;
    height: 18px;
    color: #2563eb;
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .highlight-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
    background: #f0f7ff;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #1e3a5f;
    line-height: 1.4;
  }

  .highlight-item svg {
    width: 16px;
    height: 16px;
    color: #22c55e;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .highlights-more {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e0e7ef;
    text-align: center;
    font-size: 0.85rem;
    color: #64748b;
    font-style: italic;
  }

  /* Notice */
  .notice {
    background: rgba(255,251,230,0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #ffe58f;
    border-radius: 8px;
    padding: 14px 18px;
    font-size: 0.85rem;
    color: #8b6914;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    text-align: left;
    margin-bottom: 16px;
  }

  .notice svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .notice-blue {
    background: rgba(239,246,255,0.95);
    border: 1px solid #bfdbfe;
    color: #1e40af;
  }

  /* Form Card */
  .form-card {
    background: rgba(255,255,255,0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }

  .form-header {
    padding: 24px 28px;
    border-bottom: 1px solid #eaeaea;
    background: #f8fafc;
  }

  .form-header h2 {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.3px;
    margin-bottom: 4px;
    color: #1e3a5f;
  }

  .form-header p {
    font-size: 0.85rem;
    color: #64748b;
  }

  .form-body {
    padding: 28px;
  }

  /* Form Elements */
  .field {
    margin-bottom: 24px;
  }

  .field:last-of-type {
    margin-bottom: 0;
  }

  .label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }

  .label span {
    color: #e53e3e;
  }

  .input-container {
    position: relative;
  }

  .input {
    width: 100%;
    padding: 12px 14px;
    font-size: 0.95rem;
    font-family: inherit;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    transition: all 0.15s ease;
    color: #111;
  }

  .input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  .input::placeholder {
    color: #999;
  }

  .input.has-value {
    border-color: #22c55e;
    background: #f9fefb;
  }

  .input:disabled {
    background: #fafafa;
    color: #666;
    cursor: not-allowed;
  }

  /* Search Results Dropdown */
  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    max-height: 240px;
    overflow-y: auto;
    z-index: 50;
  }

  .dropdown-item {
    padding: 12px 14px;
    cursor: pointer;
    border-bottom: 1px solid #f5f5f5;
    transition: background 0.1s;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .dropdown-item:hover {
    background: #f0f7ff;
  }

  .dropdown-item-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: #111;
    margin-bottom: 2px;
  }

  .dropdown-item-meta {
    font-size: 0.75rem;
    color: #888;
  }

  /* Selected State */
  .selected-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    padding: 12px 14px;
    margin-top: 10px;
  }

  .selected-info h4 {
    font-size: 0.9rem;
    font-weight: 500;
    color: #166534;
    margin-bottom: 2px;
  }

  .selected-info p {
    font-size: 0.75rem;
    color: #22c55e;
  }

  .btn-clear {
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
    color: #888;
    border-radius: 6px;
    transition: all 0.15s;
  }

  .btn-clear:hover {
    background: #fee2e2;
    color: #dc2626;
  }

  /* Loading Spinner */
  .spinner {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border: 2px solid #eee;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: translateY(-50%) rotate(360deg); }
  }

  /* No Results */
  .no-results {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    padding: 12px 14px;
    background: #fff7ed;
    border: 1px solid #fed7aa;
    border-radius: 8px;
    font-size: 0.8rem;
    color: #9a3412;
  }

  .hint {
    font-size: 0.75rem;
    color: #888;
    margin-top: 6px;
  }

  /* Submit Button */
  .btn-submit {
    width: 100%;
    padding: 14px 24px;
    margin-top: 28px;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: inherit;
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-submit:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37,99,235,0.3);
  }

  .btn-submit:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .btn-submit .btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  /* Success Screen */
  .success-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e40af 100%);
  }

  .success-card {
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 48px 40px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }

  .success-icon {
    width: 56px;
    height: 56px;
    background: #f0fdf4;
    border: 2px solid #22c55e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #22c55e;
  }

  .success-card h2 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
    color: #1e3a5f;
  }

  .success-card > p {
    font-size: 0.9rem;
    color: #666;
  }

  .success-details {
    background: #f8fafc;
    border-radius: 8px;
    padding: 20px;
    margin: 28px 0;
    text-align: left;
  }

  .success-details .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    font-size: 0.85rem;
  }

  .success-details .detail-row:last-child {
    border-bottom: none;
  }

  .success-details .detail-label {
    color: #888;
  }

  .success-details .detail-value {
    color: #1e3a5f;
    font-weight: 500;
  }

  .success-reminder {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 0.8rem;
    color: #0369a1;
  }

  .btn-secondary {
    margin-top: 24px;
    padding: 12px 24px;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: inherit;
    background: #fff;
    color: #1e3a5f;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-secondary:hover {
    background: #f0f7ff;
    border-color: #2563eb;
  }

  /* Responsive */
  @media (max-width: 580px) {
    .main {
      padding: 32px 16px 60px;
    }

    .hero h1 {
      font-size: 1.75rem;
    }

    .form-header, .form-body {
      padding: 20px;
    }

    .event-info {
      flex-direction: column;
      align-items: stretch;
    }

    .info-pill {
      justify-content: center;
    }

    .highlights-grid {
      grid-template-columns: 1fr;
    }

    .success-card {
      padding: 32px 24px;
    }
  }
`;

// Ícones SVG minimalistas
const Icon = {
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4M19 17v4M3 5h4M17 19h4"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
    </svg>
  )
};

function VoltaAsAulas2026() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentGrade: '',
    studentClass: '',
    studentTurno: '',
    parentName: '',
    phone: ''
  });

  const [studentSearch, setStudentSearch] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Buscar alunos no Supabase
  const searchStudents = async (term) => {
    if (term.length < 2) {
      setStudentsList([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .ilike('nome_completo', `%${term}%`)
        .order('nome_completo')
        .limit(10);

      if (error) throw error;
      setStudentsList(data || []);
      setShowDropdown(data && data.length > 0);
    } catch (error) {
      console.error('Erro:', error);
      setStudentsList([]);
    } finally {
      setIsSearching(false);
    }
  };

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
    setShowDropdown(false);
  };

  const clearSelection = () => {
    setSelectedStudent(null);
    setStudentSearch('');
    setFormData(prev => ({
      ...prev,
      studentName: '',
      studentGrade: '',
      studentClass: '',
      studentTurno: ''
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setStudentSearch(value);
    searchStudents(value);
    if (!value) clearSelection();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
      setFormData(prev => ({ ...prev, phone: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      alert('Selecione um aluno da lista.');
      return;
    }
    if (!formData.parentName.trim()) {
      alert('Informe o nome do responsável.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      alert('Informe um telefone válido.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('https://webhook.escolaamadeus.com/webhook/amadeuseventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setSuccess(true);
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <>
        <style>{styles}</style>
        <div className="app-container">
          <div className="success-container">
            <div className="success-card">
              <div className="success-icon">
                <Icon.Check />
              </div>
              <h2>Presença confirmada!</h2>
              <p>Seus dados foram registrados com sucesso.</p>
              
              <div className="success-details">
                <div className="detail-row">
                  <span className="detail-label">Aluno</span>
                  <span className="detail-value">{formData.studentName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Série/Turma</span>
                  <span className="detail-value">{formData.studentGrade} - {formData.studentClass}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Turno</span>
                  <span className="detail-value">{formData.studentTurno}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Responsável</span>
                  <span className="detail-value">{formData.parentName}</span>
                </div>
              </div>

              <div className="success-reminder">
                <Icon.Calendar />
                24/01/2026 às 14h — Escola Amadeus
              </div>

              <button className="btn-secondary" onClick={() => window.location.reload()}>
                Nova confirmação
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
      <div className="app-container">
        
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <span className="logo">Escola Amadeus</span>
            <span className="header-badge">Evento Gratuito</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="main">
          
          {/* Hero */}
          <section className="hero">
            <span className="event-tag">Ano Letivo 2026</span>
            <h1>Volta às Aulas 2026<br/>Escola Amadeus</h1>
            <p className="hero-subtitle">Reunião de Pais e Responsáveis</p>

            <div className="event-info">
              <div className="info-pill">
                <Icon.Calendar />
                <span>24 de Janeiro de 2026</span>
              </div>
              <div className="info-pill">
                <Icon.Clock />
                <span>14h às 17h</span>
              </div>
              <div className="info-pill">
                <Icon.MapPin />
                <span>Escola Amadeus</span>
              </div>
            </div>
          </section>

          {/* O que esperar da reunião */}
          <div className="highlights-card">
            <h3>
              <Icon.Sparkles />
              O que você vai encontrar
            </h3>
            <div className="highlights-grid">
              <div className="highlight-item">
                <Icon.CheckCircle />
                <span>Oficinas para conhecer nossos projetos</span>
              </div>
              <div className="highlight-item">
                <Icon.CheckCircle />
                <span>Conhecer os(as) professores(as) </span>
              </div>
              <div className="highlight-item">
                <Icon.CheckCircle />
                <span>Visitar as salas de aula</span>
              </div>
              <div className="highlight-item">
                <Icon.CheckCircle />
                <span>Conhecer as coordenadoras</span>
              </div>
              <div className="highlight-item">
                <Icon.CheckCircle />
                <span>Tirar todas as suas dúvidas</span>
              </div>
              <div className="highlight-item">
                <Icon.CheckCircle />
                <span>E muito mais!</span>
              </div>
            </div>
          </div>

          {/* Avisos */}
          <div className="notice">
            <Icon.AlertCircle />
            <span>Este evento é <strong>exclusivo para pais e responsáveis</strong>. Pedimos que não tragam os filhos.</span>
          </div>

          <div className="notice notice-blue">
            <Icon.Info />
            <span>Solicitamos que este formulário seja preenchido <strong>apenas pelo participante que realmente irá comparecer</strong> à reunião, a fim de garantirmos uma melhor organização do evento. Agradecemos a compreensão.</span>
          </div>

          {/* Form */}
          <div className="form-card">
            <div className="form-header">
              <h2>Confirmar presença</h2>
              <p>Preencha os dados abaixo para confirmar</p>
            </div>

            <div className="form-body">
              <form onSubmit={handleSubmit}>
                
                {/* Busca Aluno */}
                <div className="field">
                  <label className="label">Nome do aluno <span>*</span></label>
                  <div className="input-container">
                    <input
                      type="text"
                      className={`input ${selectedStudent ? 'has-value' : ''}`}
                      value={studentSearch}
                      onChange={handleSearchChange}
                      onFocus={() => studentsList.length > 0 && setShowDropdown(true)}
                      placeholder="Digite para buscar..."
                      autoComplete="off"
                    />
                    {isSearching && <div className="spinner" />}

                    {showDropdown && !selectedStudent && (
                      <div className="dropdown">
                        {studentsList.map((s) => (
                          <div key={s.id} className="dropdown-item" onClick={() => selectStudent(s)}>
                            <div className="dropdown-item-name">{s.nome_completo}</div>
                            <div className="dropdown-item-meta">{s.serie} · Turma {s.turma} · {s.turno}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedStudent && (
                    <div className="selected-card">
                      <div className="selected-info">
                        <h4>{selectedStudent.nome_completo}</h4>
                        <p>{selectedStudent.serie} · Turma {selectedStudent.turma} · {selectedStudent.turno}</p>
                      </div>
                      <button type="button" className="btn-clear" onClick={clearSelection}>
                        <Icon.X />
                      </button>
                    </div>
                  )}

                  {studentSearch.length >= 2 && studentsList.length === 0 && !selectedStudent && !isSearching && (
                    <div className="no-results">
                      <Icon.AlertCircle />
                      Nenhum aluno encontrado
                    </div>
                  )}

                  {studentSearch.length > 0 && studentSearch.length < 2 && (
                    <p className="hint">Digite pelo menos 2 letras</p>
                  )}
                </div>

                {/* Nome Responsável */}
                <div className="field">
                  <label className="label">Nome do responsável <span>*</span></label>
                  <input
                    type="text"
                    name="parentName"
                    className="input"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Nome completo"
                    required
                  />
                </div>

                {/* Telefone */}
                <div className="field">
                  <label className="label">Telefone / WhatsApp <span>*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(84) 99999-9999"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isProcessing || !selectedStudent}
                >
                  {isProcessing ? (
                    <>
                      <div className="btn-spinner" />
                      Confirmando...
                    </>
                  ) : (
                    'Confirmar presença'
                  )}
                </button>
              </form>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default VoltaAsAulas2026;


