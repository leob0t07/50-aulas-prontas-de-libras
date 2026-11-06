/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import instructorPhoto from './images/Woman_teaching_Brazilian_Sign_La_cb978dc0_2K-optimized-261105171825_FileVert.jpg';

/* ==========================================================================
   CONFIGURAÇÃO DA LANDING PAGE
   Edite os valores abaixo facilmente sem precisar alterar o restante do código.
   ========================================================================== */
export const CONFIG = {
  // Links de checkout para onde o comprador será redirecionado
  checkoutEssencial: 'https://pay.cakto.com.br/35x5cz8',
  checkoutCompleto: 'https://pay.cakto.com.br/35x5cz8',

  // Foto, dados do professor / autor / instituição (Seção 6)
  fotoInstrutora: instructorPhoto,
  nomeMarca: 'Prof. Carla Mendes',
  experiencia: 'Instrutora e Pedagoga de Libras há mais de 8 anos',

  // Contato / Suporte para dúvidas
  emailSuporte: 'contato@aulaslibras.com.br',
};

// Ícone SVG de Check Verde Suave (#3F7D5A)
function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={`inline-block shrink-0 text-[#3F7D5A] ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="4 10.5 8 14.5 16 6" />
    </svg>
  );
}

// Marcador de traço customizado para a lista do problema
function DashIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={`inline-block shrink-0 text-[#E0603A] ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="2" y1="8" x2="14" y2="8" />
    </svg>
  );
}

// Selo de garantia desenhado em SVG (sem emoji)
function SealIcon({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg
      className={`mx-auto text-[#1B2A41] ${className}`}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* Círculo externo dentado / selo */}
      <circle cx="40" cy="40" r="36" stroke="#1B2A41" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="40" cy="40" r="30" stroke="#1B2A41" strokeWidth="1.5" />
      {/* Número 7 em destaque */}
      <text
        x="40"
        y="43"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1B2A41"
        fontFamily="'Young Serif', Georgia, serif"
        fontSize="24"
        fontWeight="bold"
      >
        7
      </text>
      <text
        x="40"
        y="57"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1B2A41"
        fontFamily="'Figtree', sans-serif"
        fontSize="8"
        letterSpacing="1.5"
        fontWeight="bold"
      >
        DIAS
      </text>
    </svg>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const planosRef = useRef<HTMLElement>(null);

  const scrollToPlanos = () => {
    const el = document.getElementById('planos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Disparo de rastreamento do Meta Pixel
  const trackInitiateCheckout = (planName: string, value: number) => {
    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'InitiateCheckout', {
        content_name: planName,
        value: value,
        currency: 'BRL',
      });
    }
  };

  // Controle de visibilidade do CTA fixo no rodapé mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !planosRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const planosRect = planosRef.current.getBoundingClientRect();

      // Já rolou além do hero
      const pastHero = heroRect.bottom < 80;
      // Planos já está visível na tela
      const planosInView =
        planosRect.top < window.innerHeight && planosRect.bottom > 80;

      // Mostra a barra fixa se passou do hero e a seção de planos NÃO está na tela
      setShowStickyCta(pastHero && !planosInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const blocosTematicos = [
    { num: '01', tema: 'Alfabeto e Cumprimentos', desc: 'Base para qualquer iniciante' },
    { num: '02', tema: 'Família', desc: 'Vínculos familiares em sinais' },
    { num: '03', tema: 'Números e Cores', desc: 'Vocabulário visual essencial' },
    { num: '04', tema: 'Alimentos', desc: 'Sinais do dia a dia ligados à comida' },
    { num: '05', tema: 'Rotina Diária', desc: 'Verbos e ações cotidianas' },
    { num: '06', tema: 'Sentimentos', desc: 'Expressão de emoções em Libras' },
    { num: '07', tema: 'Escola', desc: 'Vocabulário do ambiente escolar' },
    { num: '08', tema: 'Corpo Humano', desc: 'Sinais de partes do corpo' },
    { num: '09', tema: 'Lugares', desc: 'Localização e espaços comuns' },
    { num: '10', tema: 'Expressões do Dia a Dia', desc: 'Frases e sinais usados na conversa cotidiana' },
  ];

  const faqs = [
    {
      q: 'Preciso saber Libras para usar?',
      a: 'O material foi pensado para quem já ensina ou está começando a ensinar. Se você é iniciante, as ilustrações e a ordem das aulas ajudam, mas recomendamos apoio de um profissional ou pessoa surda para validar a execução dos sinais.',
    },
    {
      q: 'É em vídeo?',
      a: 'Não. É material ilustrado em PDF, para imprimir ou usar na tela.',
    },
    {
      q: 'Como recebo?',
      a: 'Por e-mail, imediatamente após a confirmação do pagamento.',
    },
    {
      q: 'Posso usar com turmas diferentes?',
      a: 'Sim. As aulas são independentes e você pode reaplicar com quantas turmas quiser, no seu próprio ensino.',
    },
    {
      q: 'Posso revender ou compartilhar o PDF?',
      a: 'Não. O material é de uso individual do comprador.',
    },
    {
      q: 'E se eu não gostar?',
      a: 'Garantia de 7 dias: você pede o reembolso e recebe o valor de volta.',
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#FAF6EE] text-[#1B2A41] font-['Figtree',sans-serif] selection:bg-[#E8B84A]/30 selection:text-[#1B2A41]">
      {/* ==================================================================
          BARRA SUPERIOR (fina, sem menu)
          ================================================================== */}
      <aside
        aria-label="Aviso de entrega"
        className="w-full bg-[#1B2A41] text-[#FAF6EE] text-center text-[11px] sm:text-xs md:text-sm py-2 px-3 sm:px-4 tracking-normal sm:tracking-wide font-medium border-b border-[#1B2A41]/20 leading-snug"
      >
        Material imprimível para professores de Libras · 50 aulas · Entrega imediata
      </aside>

      <main className="w-full overflow-x-hidden">
        {/* ==================================================================
            HERO (Fundo Creme #FAF6EE, mobile-first)
            ================================================================== */}
        <section
          ref={heroRef}
          className="pt-8 pb-12 sm:pt-14 sm:pb-20 md:pt-20 md:pb-24 px-4 sm:px-6 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna de Texto (Mobile-first, alinhado à esquerda) */}
            <div className="lg:col-span-7 text-left max-w-[640px] mx-auto lg:mx-0 w-full">
              <h1 className="font-['Young_Serif',serif] text-[1.95rem] leading-[1.12] sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#1B2A41] tracking-tight mb-3 sm:mb-4">
                50 Aulas Prontas de Libras
              </h1>

              <h2 className="font-['Young_Serif',serif] text-[1.2rem] sm:text-2xl md:text-[1.65rem] leading-snug text-[#1B2A41] mb-4 sm:mb-5 font-normal">
                <span className="highlight-pen">Abra, imprima e ensine</span>. Sem montar aula do zero toda semana.
              </h2>

              <p className="text-[#1B2A41]/85 text-[15px] sm:text-lg leading-relaxed mb-6 sm:mb-7">
                Sinais organizados por tema, atividade prática e dinâmica de grupo em cada aula. Você escolhe o tema, imprime e entra na sala com a aula pronta.
              </p>

              <div>
                <button
                  type="button"
                  onClick={scrollToPlanos}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#E0603A] hover:bg-[#cf5430] text-white text-base sm:text-lg font-bold min-h-[50px] px-7 py-3.5 rounded-[6px] shadow-sticker transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B2A41] focus:ring-offset-2 active:translate-x-[2px] active:translate-y-[2px]"
                >
                  Quero as 50 aulas
                </button>

                <p className="text-xs sm:text-sm text-[#1B2A41]/75 mt-2.5 sm:mt-3 tracking-normal leading-normal">
                  A partir de R$ 9,90 · Pagamento único · Acesso imediato no e-mail
                </p>
              </div>
            </div>

            {/* Coluna do Mockup Visual de Folha Impressa (HTML/CSS Puro, escalável para mobile) */}
            <div className="lg:col-span-5 flex justify-center items-center pt-4 sm:pt-4 w-full">
              {/* ===================================================================
                  [MOCKUP HERO EDITÁVEL]
                  Se você preferir substituir este mockup artesanal de folha impressa
                  por uma foto ou imagem real da apostila, troque o bloco abaixo por:
                  
                  <img
                    src="/foto-apostila.jpg"
                    alt="Apostila física 50 Aulas Prontas de Libras"
                    className="w-full max-w-[340px] rounded-[6px] shadow-sticker border border-[#1B2A41]/20"
                  />
                  =================================================================== */}
              <div
                className="relative w-full max-w-[290px] xs:max-w-[320px] sm:max-w-[350px] mx-auto select-none"
                aria-label="Representação visual da apostila impressa de Libras"
              >
                {/* Folha traseira inclinada */}
                <div
                  className="absolute inset-0 bg-[#F1EADB] border border-[#1B2A41]/20 rounded-[6px] shadow-sticker rotate-[1.5deg] sm:rotate-[3deg] translate-x-1 sm:translate-x-2 translate-y-1 sm:translate-y-2 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Folha frontal inclinada */}
                <div className="relative bg-[#FFFFFF] border-2 border-[#1B2A41] rounded-[6px] shadow-sticker-lg p-4 sm:p-6 rotate-[-1deg] sm:rotate-[-2deg] text-[#1B2A41]">
                  {/* Cabeçalho da folha tipo ficha escolar */}
                  <div className="border-b-2 border-[#1B2A41] pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-['Young_Serif',serif] text-base sm:text-lg text-[#1B2A41]">
                        Aula 03 · Família
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#1B2A41]/60">
                        Nível 1
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#1B2A41]/70 flex justify-between">
                      <span>Tema: Vínculos em Libras</span>
                      <span>50 Aulas Prontas</span>
                    </div>
                  </div>

                  {/* Grade de quadros com sinais ilustrados (Mãe, Pai, Irmão, Avó) */}
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1B2A41]/70 mb-2">
                    Vocabulário e Sinais
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                    {[
                      { nome: 'Mãe', sinal: 'Mão em B tocando a bochecha e benção' },
                      { nome: 'Pai', sinal: 'Sinal de benção e carinho no queixo' },
                      { nome: 'Irmão', sinal: 'Dedos indicadores unidos lado a lado' },
                      { nome: 'Avó', sinal: 'Sinal de mãe seguido da mão trêmula' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="border border-[#1B2A41]/30 rounded-[4px] p-1.5 sm:p-2 bg-[#FAF6EE]/50 flex flex-col items-center justify-center min-h-[64px] sm:min-h-[72px] text-center"
                      >
                        {/* Desenho estilizado de mão / configuração de sinal */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-dashed border-[#1B2A41]/40 flex items-center justify-center mb-1 bg-white">
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B2A41]/70"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                          </svg>
                        </div>
                        <span className="font-bold text-[11px] sm:text-xs text-[#1B2A41]">{item.nome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Linha de atividade estilo caderno no rodapé da folha */}
                  <div className="border-t border-[#1B2A41]/20 pt-2.5 sm:pt-3">
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#E0603A] mb-0.5 sm:mb-1">
                      Atividade Prática 03:
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-[#1B2A41]/80 leading-snug">
                      Apresentação da árvore genealógica em duplas usando os 4 sinais aprendidos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 2: O PROBLEMA (Fundo Alternativo #F1EADB)
            ================================================================== */}
        <section className="bg-[#F1EADB] py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 border-y border-[#1B2A41]/10">
          <div className="max-w-[640px] mx-auto text-left">
            <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-snug mb-5 sm:mb-6">
              Preparar aula de Libras toma mais tempo do que dar a aula.
            </h2>

            <p className="text-[15px] sm:text-lg text-[#1B2A41]/90 font-medium mb-5 sm:mb-6">
              Você já passou por isso:
            </p>

            <ul className="space-y-3 sm:space-y-3.5 mb-7 sm:mb-8">
              {[
                'Procurar referência de sinal em vídeo antes de cada aula',
                'Montar sequência do zero, toda semana',
                'Criar atividade na véspera, de última hora',
                'Ter vontade de ensinar bem, mas não ter material organizado em português',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-[15px] sm:text-[17px] text-[#1B2A41]">
                  <span className="mt-1 sm:mt-1.5 shrink-0">
                    <DashIcon />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-l-3 border-[#E0603A] pl-3.5 sm:pl-5 py-1">
              <p className="font-['Young_Serif',serif] text-[1.1rem] sm:text-xl md:text-2xl text-[#1B2A41] leading-snug">
                O problema não é falta de vontade. É falta de material pronto para aplicar.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 3: O QUE É (Fundo #FAF6EE)
            ================================================================== */}
        <section className="py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 max-w-[640px] mx-auto text-left">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E0603A] block mb-2">
            O QUE É ISSO
          </span>

          <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-4 sm:mb-5">
            Não é dicionário de sinais. É a aula pronta.
          </h2>

          <p className="text-[15px] sm:text-lg text-[#1B2A41]/85 leading-relaxed mb-8 sm:mb-10">
            As 50 Aulas Prontas de Libras reúnem os sinais por tema, cada um com apoio ilustrado, atividade de fixação e sugestão de dinâmica em grupo. Cada aula é independente: você pega a que precisa e aplica.
          </p>

          <h3 className="font-['Young_Serif',serif] text-lg sm:text-2xl text-[#1B2A41] mb-5 sm:mb-6">
            Cada aula tem 3 partes
          </h3>

          <div className="space-y-5 sm:space-y-6">
            {[
              {
                num: '01',
                title: 'Abertura do tema',
                text: 'Vocabulário da aula organizado em um bloco só.',
              },
              {
                num: '02',
                title: 'Sinais com apoio ilustrado',
                text: 'Imagens claras de cada sinal para apresentar à turma.',
              },
              {
                num: '03',
                title: 'Atividade prática',
                text: 'Jogo ou exercício guiado para fixar o que foi ensinado.',
              },
            ].map((parte) => (
              <div
                key={parte.num}
                className="border-b border-[#1B2A41]/15 pb-4 sm:pb-5 last:border-b-0"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="font-['Young_Serif',serif] text-2xl sm:text-3xl text-[#E0603A] shrink-0 leading-none pt-0.5">
                    {parte.num}
                  </span>
                  <p className="text-[15px] sm:text-lg text-[#1B2A41] leading-relaxed">
                    <strong className="font-bold text-[#1B2A41]">{parte.title}</strong> — {parte.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 4: O CONTEÚDO (Fundo Alternativo #F1EADB)
            ================================================================== */}
        <section className="bg-[#F1EADB] py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 border-y border-[#1B2A41]/10">
          <div className="max-w-[640px] mx-auto text-left">
            <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-6 sm:mb-8">
              10 blocos temáticos, 5 aulas em cada um.
            </h2>

            {/* Sumário editorial estilo livro com linha de pontos */}
            <div className="space-y-3.5 sm:space-y-4 mb-7 sm:mb-8">
              {blocosTematicos.map((bloco) => (
                <div key={bloco.num} className="border-b border-[#1B2A41]/10 pb-3 last:border-b-0">
                  {/* Desktop: linha única com pontinhos */}
                  <div className="hidden sm:flex items-baseline justify-between">
                    <span className="font-bold text-[#1B2A41] whitespace-nowrap">
                      <span className="font-['Young_Serif',serif] font-normal text-[#E0603A] mr-2">
                        {bloco.num}
                      </span>
                      {bloco.tema}
                    </span>
                    <span className="dot-leader" aria-hidden="true" />
                    <span className="text-[#1B2A41]/75 text-sm whitespace-nowrap">
                      {bloco.desc}
                    </span>
                  </div>

                  {/* Mobile: empilhado com número e tema em negrito e descrição abaixo */}
                  <div className="sm:hidden">
                    <div className="flex items-baseline gap-2">
                      <span className="font-['Young_Serif',serif] text-[#E0603A] text-base shrink-0">
                        {bloco.num}
                      </span>
                      <span className="font-bold text-[#1B2A41] text-[15px] leading-snug">
                        {bloco.tema}
                      </span>
                    </div>
                    <div className="text-xs text-[#1B2A41]/80 pl-6 mt-0.5 leading-relaxed">
                      {bloco.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="italic text-xs sm:text-base text-[#1B2A41]/80 text-left border-t border-[#1B2A41]/15 pt-4 sm:pt-5 leading-normal">
              Cada aula inclui sinais ilustrados · atividade de fixação · sugestão de dinâmica em grupo.
            </p>
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 5: PRA QUEM É (Fundo #FAF6EE)
            ================================================================== */}
        <section className="py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 max-w-[640px] mx-auto text-left">
          <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-6 sm:mb-8">
            Se você se reconhece em algum desses pontos, esse material é pra você.
          </h2>

          <ul className="space-y-3.5 sm:space-y-4">
            {[
              'Dá aula de Libras em escola, curso livre ou atendimento particular',
              'Passa tempo demais procurando e organizando referência antes de cada aula',
              'Quer um material visual, já que Libras é uma língua visual',
              'Ensina online e presencial e precisa de algo que funcione nos dois formatos',
              'Está começando e ainda não tem sequência de aulas montada',
              'Quer gastar o tempo ensinando, não produzindo material',
            ].map((ponto, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 sm:gap-3.5 text-[15px] sm:text-lg text-[#1B2A41] leading-relaxed border-b border-[#1B2A41]/10 pb-3 last:border-b-0"
              >
                <span className="mt-1 shrink-0">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <span>{ponto}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ==================================================================
            SEÇÃO 6: QUEM PREPAROU (Fundo Alternativo #F1EADB)
            ================================================================== */}
        <section className="bg-[#F1EADB] py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 border-y border-[#1B2A41]/10">
          <div className="max-w-[640px] mx-auto text-left">
            <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-5 sm:mb-6">
              Quem preparou este material
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white/60 p-4 sm:p-5 rounded-[6px] border border-[#1B2A41]/15 shadow-sm">
              <img
                src={CONFIG.fotoInstrutora}
                alt={`Foto da instrutora de Libras ${CONFIG.nomeMarca}`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-[6px] object-cover border-2 border-[#1B2A41] shadow-sticker shrink-0"
              />
              <div className="flex-1">
                <p className="text-[15px] sm:text-lg text-[#1B2A41] font-semibold mb-1.5 sm:mb-2 leading-snug">
                  {CONFIG.nomeMarca} · {CONFIG.experiencia}
                </p>

                <p className="text-xs sm:text-base text-[#1B2A41]/75 leading-relaxed">
                  Material em evolução: se você encontrar um sinal que precise de ajuste, avise e corrigimos na próxima atualização.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 7: COMO FUNCIONA (Fundo #FAF6EE)
            ================================================================== */}
        <section className="py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 max-w-[720px] mx-auto text-left">
          <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-8 sm:mb-10">
            Simples assim.
          </h2>

          <div className="relative flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Linha vertical conectando os passos no mobile */}
            <div
              className="md:hidden absolute top-6 bottom-8 left-5 w-[1.5px] bg-[#1B2A41]/20 -z-0"
              aria-hidden="true"
            />
            {/* Linha horizontal no desktop */}
            <div
              className="hidden md:block absolute top-7 left-12 right-12 h-[1px] bg-[#1B2A41]/20 -z-0"
              aria-hidden="true"
            />

            {[
              {
                passo: '1',
                titulo: 'Compra',
                desc: 'Pagamento único, você recebe o PDF na hora no e-mail.',
              },
              {
                passo: '2',
                titulo: 'Escolhe o tema',
                desc: 'Seleciona o bloco da próxima aula entre os 10 disponíveis.',
              },
              {
                passo: '3',
                titulo: 'Imprime e aplica',
                desc: 'A aula já vem pronta do início ao fim. É só rodar com a turma.',
              },
            ].map((p) => (
              <div key={p.passo} className="relative z-10 flex items-start gap-4 md:flex-col md:items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-[6px] bg-[#FAF6EE] border-2 border-[#1B2A41] shadow-sticker flex items-center justify-center font-['Young_Serif',serif] text-lg sm:text-xl text-[#1B2A41]">
                  {p.passo}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#1B2A41] mb-1">{p.titulo}</h3>
                  <p className="text-xs sm:text-base text-[#1B2A41]/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO BÔNUS: INCLUSO NO PLANO COMPLETO (Acima de Planos)
            ================================================================== */}
        <section className="bg-[#F1EADB] py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 border-t border-[#1B2A41]/10 text-left">
          <div className="max-w-[640px] mx-auto">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E0603A] block mb-2">
              MATERIAL EXTRA
            </span>

            <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-6 sm:mb-8">
              Incluso no Plano Completo
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {/* BÔNUS 1 */}
              <div className="border border-[#1B2A41]/15 rounded-[6px] p-4 sm:p-6 bg-white/80 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start text-center sm:text-left">
                  {/* Mockup CSS do Pôster de Alfabeto Manual com letras A, B, C */}
                  <div
                    className="shrink-0 w-24 h-32 sm:w-28 sm:h-36 bg-white border-2 border-[#1B2A41] rounded-[4px] shadow-sticker p-2 flex flex-col justify-between"
                    aria-hidden="true"
                  >
                    <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#1B2A41] border-b border-[#1B2A41]/20 pb-0.5 sm:pb-1 text-center">
                      Alfabeto
                    </div>
                    <div className="grid grid-cols-3 gap-0.5 sm:gap-1 my-auto">
                      {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
                        <div
                          key={letter}
                          className="aspect-square border border-[#1B2A41]/30 rounded-[2px] flex flex-col items-center justify-center bg-[#FAF6EE]/50"
                        >
                          <span className="font-bold text-[9px] sm:text-[10px] text-[#1B2A41]">{letter}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[7px] text-center text-[#1B2A41]/60 font-medium">
                      Pôster A3 / A4
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#1B2A41] mb-1.5 sm:mb-2 leading-snug">
                      Bônus 1: Alfabeto Manual Ilustrado para Colar na Parede
                    </h3>
                    <p className="text-xs sm:text-base text-[#1B2A41]/85 leading-relaxed">
                      Pôster com o alfabeto manual completo, ilustrado, para deixar na sala como referência visual constante.
                    </p>
                  </div>
                </div>
              </div>

              {/* BÔNUS 2 */}
              <div className="border border-[#1B2A41]/15 rounded-[6px] p-4 sm:p-6 bg-white/80 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start text-center sm:text-left">
                  {/* Mockup CSS das Cartelas Viradas de Jogo de Memória */}
                  <div
                    className="shrink-0 w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center relative"
                    aria-hidden="true"
                  >
                    {/* Cartela traseira */}
                    <div className="w-14 h-20 sm:w-16 sm:h-22 bg-white border-2 border-[#1B2A41] rounded-[4px] shadow-sticker rotate-[-10deg] absolute flex flex-col items-center justify-center p-1 sm:p-1.5">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-dashed border-[#1B2A41]/30 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-[#E0603A]">
                        SINAL
                      </div>
                      <span className="text-[7px] sm:text-[8px] font-bold mt-1 text-[#1B2A41]">Bom dia</span>
                    </div>
                    {/* Cartela frontal virada */}
                    <div className="w-14 h-20 sm:w-16 sm:h-22 bg-[#FAF6EE] border-2 border-[#1B2A41] rounded-[4px] shadow-sticker rotate-[8deg] translate-x-2.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-2 absolute flex flex-col items-center justify-center p-1 sm:p-1.5">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-[#1B2A41]/30 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-[#1B2A41] bg-white">
                        PAR
                      </div>
                      <span className="text-[7px] sm:text-[8px] font-bold mt-1 text-[#1B2A41]">Imagem</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#1B2A41] mb-1.5 sm:mb-2 leading-snug">
                      Bônus 2: Cartelas de Sinais para Jogo de Memória
                    </h3>
                    <p className="text-xs sm:text-base text-[#1B2A41]/85 leading-relaxed">
                      30 cartelas imprimíveis com sinais ilustrados, prontas para montar um jogo de memória e reforçar o vocabulário de forma lúdica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 8: PLANOS (id="planos", fundo escuro #1B2A41 com texto creme)
            ================================================================== */}
        <section
          id="planos"
          ref={planosRef}
          className="bg-[#1B2A41] text-[#FAF6EE] py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 scroll-mt-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#FAF6EE] leading-tight text-left mb-8 sm:mb-10">
              Escolha como quer começar.
            </h2>

            {/* Grid dos dois planos: no mobile o COMPLETO vem PRIMEIRO conforme especificação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* PLANO COMPLETO (Destaque - Primeiro no Mobile via order-1 md:order-2) */}
              <div className="order-1 md:order-2 relative bg-[#FAF6EE] text-[#1B2A41] p-5 sm:p-8 rounded-[6px] border-2 border-[#1B2A41] shadow-sticker-lg flex flex-col justify-between">
                {/* Selo Mostarda Inclinado: Mais escolhido */}
                <div
                  className="absolute -top-3 right-3 sm:right-4 bg-[#E8B84A] text-[#1B2A41] text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[4px] border border-[#1B2A41] rotate-[2deg] sm:rotate-[3deg] shadow-sticker"
                  aria-label="Plano mais escolhido"
                >
                  Mais escolhido
                </div>

                <div>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E0603A]">
                      COMPLETO
                    </span>
                    <h3 className="font-['Young_Serif',serif] text-2xl sm:text-3xl text-[#1B2A41] mt-0.5 sm:mt-1">
                      Plano Completo
                    </h3>
                  </div>

                  <div className="mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-[#1B2A41]/15">
                    <div className="font-['Young_Serif',serif] text-3xl sm:text-4xl text-[#1B2A41]">
                      R$ 19,90
                    </div>
                    <span className="text-xs sm:text-sm text-[#1B2A41]/75 font-medium">
                      pagamento único
                    </span>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-left text-[14px] sm:text-base">
                    {[
                      'Tudo do Plano Essencial, mais:',
                      'Versão para imprimir (fundo limpo, economiza tinta)',
                      'Bônus 1: Alfabeto Manual Ilustrado para colar na parede',
                      'Bônus 2: 30 cartelas de sinais para jogo de memória',
                      'Garantia de 7 dias',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0">
                          <CheckIcon className="w-4 h-4" />
                        </span>
                        <span className={i === 0 ? 'font-bold' : ''}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <a
                    href={CONFIG.checkoutCompleto}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInitiateCheckout('Plano Completo - 50 Aulas Prontas de Libras', 19.90)}
                    className="w-full inline-flex items-center justify-center bg-[#E0603A] hover:bg-[#cf5430] text-white text-base sm:text-lg font-bold min-h-[50px] px-5 py-3.5 rounded-[6px] shadow-sticker transition cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-[#1B2A41] focus:ring-offset-2 active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    Quero o Completo · R$ 19,90
                  </a>
                </div>
              </div>

              {/* PLANO ESSENCIAL (Segundo no Mobile via order-2 md:order-1) */}
              <div className="order-2 md:order-1 bg-transparent border-2 border-[#FAF6EE]/40 text-[#FAF6EE] p-5 sm:p-8 rounded-[6px] flex flex-col justify-between">
                <div>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FAF6EE]/70">
                      BÁSICO
                    </span>
                    <h3 className="font-['Young_Serif',serif] text-2xl sm:text-3xl text-[#FAF6EE] mt-0.5 sm:mt-1">
                      Plano Essencial
                    </h3>
                  </div>

                  <div className="mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-[#FAF6EE]/20">
                    <div className="font-['Young_Serif',serif] text-3xl sm:text-4xl text-[#FAF6EE]">
                      R$ 9,90
                    </div>
                    <span className="text-xs sm:text-sm text-[#FAF6EE]/75 font-medium">
                      pagamento único
                    </span>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-left text-[14px] sm:text-base text-[#FAF6EE]/90">
                    {[
                      '50 aulas completas de Libras em PDF',
                      '10 blocos temáticos, 5 aulas cada',
                      'Sinais ilustrados e atividade prática em cada aula',
                      'Sugestão de dinâmica em grupo por aula',
                      'Formato A4: use na tela ou imprima',
                      'Entrega imediata por e-mail',
                      'Garantia de 7 dias',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0">
                          <CheckIcon className="w-4 h-4 text-[#88C59F]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <a
                    href={CONFIG.checkoutEssencial}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInitiateCheckout('Plano Essencial - 50 Aulas Prontas de Libras', 9.90)}
                    className="w-full inline-flex items-center justify-center bg-transparent hover:bg-[#FAF6EE]/10 text-[#FAF6EE] border-2 border-[#FAF6EE] text-base sm:text-lg font-bold min-h-[50px] px-5 py-3.5 rounded-[6px] transition cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-[#FAF6EE] focus:ring-offset-2 active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    Quero o Essencial · R$ 9,90
                  </a>
                </div>
              </div>
            </div>

            {/* Microcopy abaixo dos dois planos */}
            <p className="text-xs sm:text-sm text-[#FAF6EE]/75 text-center mt-6 sm:mt-8 tracking-normal sm:tracking-wide leading-relaxed">
              Por menos de R$ 0,40 por aula, você tem material pronto para o semestre inteiro.
            </p>
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 10: GARANTIA (Centralizada)
            ================================================================== */}
        <section className="bg-[#F1EADB] py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 border-y border-[#1B2A41]/10 text-center">
          <div className="max-w-[560px] mx-auto">
            {/* Selo desenhado em SVG simples, sem emoji */}
            <div className="mb-4 sm:mb-5">
              <SealIcon className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>

            <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-3 sm:mb-4">
              Garantia incondicional de 7 dias.
            </h2>

            <p className="text-[15px] sm:text-lg text-[#1B2A41]/85 leading-relaxed">
              Baixou, olhou e não serviu para a sua turma? Peça o reembolso em até 7 dias e o valor volta, sem burocracia.
            </p>
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 11: PERGUNTAS FREQUENTES (Acordeão simples, uma aberta por vez)
            ================================================================== */}
        <section className="py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 max-w-[640px] mx-auto text-left">
          <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-6 sm:mb-8">
            Perguntas Frequentes
          </h2>

          <div className="border-t border-[#1B2A41]/15">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-[#1B2A41]/15">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full py-3.5 sm:py-4 min-h-[50px] text-left flex justify-between items-center gap-3 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1B2A41] rounded-[2px]"
                  >
                    <span className="font-bold text-[15px] sm:text-[17px] text-[#1B2A41] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className="shrink-0 w-6 h-6 rounded border border-[#1B2A41]/30 flex items-center justify-center text-sm font-bold text-[#1B2A41]"
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-4 pt-1 text-[14px] sm:text-base text-[#1B2A41]/85 leading-relaxed pr-2 sm:pr-6">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================================
            SEÇÃO 12: CTA FINAL (Centralizada, Fundo Alternativo #F1EADB)
            ================================================================== */}
        <section className="bg-[#F1EADB] py-14 sm:py-[72px] md:py-[112px] px-4 sm:px-6 border-t border-[#1B2A41]/10 text-center">
          <div className="max-w-[640px] mx-auto">
            <h2 className="font-['Young_Serif',serif] text-[1.45rem] sm:text-3xl md:text-4xl text-[#1B2A41] leading-tight mb-5 sm:mb-6">
              Sua próxima aula pode estar pronta hoje.
            </h2>

            <div>
              <button
                type="button"
                onClick={scrollToPlanos}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#E0603A] hover:bg-[#cf5430] text-white text-base sm:text-lg font-bold min-h-[52px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-[6px] shadow-sticker transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B2A41] focus:ring-offset-2 active:translate-x-[2px] active:translate-y-[2px]"
              >
                Quero as 50 aulas · a partir de R$ 9,90
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================================
          RODAPÉ
          ================================================================== */}
      <footer className="bg-[#FAF6EE] text-[#1B2A41]/75 text-xs sm:text-sm py-8 sm:py-10 px-4 sm:px-5 text-center border-t border-[#1B2A41]/10">
        <div className="max-w-2xl mx-auto space-y-2">
          <p>Este material é um recurso pedagógico de apoio ao ensino de Libras. Garantia incondicional de 7 dias.</p>
          <p className="text-[11px] text-[#1B2A41]/50">
            Dúvidas ou suporte: {CONFIG.emailSuporte}
          </p>
        </div>
      </footer>

      {/* ==================================================================
          BARRA FIXA DE CTA NO RODAPÉ DO MOBILE (390px-friendly)
          Aparece após rolar o hero e some quando a seção de planos estiver visível
          ================================================================== */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-2.5 sm:hidden bg-[#FAF6EE]/95 backdrop-blur-xs border-t-2 border-[#1B2A41] shadow-[0_-4px_16px_rgba(27,42,65,0.12)] pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] transition-all duration-200 ${
          showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={scrollToPlanos}
          className="w-full bg-[#E0603A] hover:bg-[#cf5430] text-white font-bold text-[15px] min-h-[46px] py-3 px-4 rounded-[6px] shadow-sticker transition flex items-center justify-center cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
        >
          Ver planos · a partir de R$ 9,90
        </button>
      </div>
    </div>
  );
}
