/**
 * @file HomePage.tsx
 * @description Página principal (Home) da aplicação.
 * @author Matheus/Time
 * @date 2025-11-03
 * * @component HomePage
 * @brief Renderiza a página de boas-vindas principal utilizando o sistema de
 * layout e componentes do Ant Design.
 * * @prop (nenhuma) - Este componente é uma "página" e não recebe props diretas.
 *
 * @section Arquitetura
 * - **Layout:** Utilizamos o componente `Layout` do Ant Design para uma estrutura de
 * página padrão (Header, Content, Footer).
 * - **Tipografia:** `Typography` é usado para consistência em títulos e textos.
 * - **Grid:** `Row` e `Col` são usados para criar um layout de grid responsivo
 * para os cards das tecnologias.
 * - **Dados:** As informações das tecnologias são mantidas em um array de objetos
 * tipado (`techStackData`) para fácil manutenção e iteração.
 * - **Componentização:** `Card` e `Meta` do Ant Design são usados para exibir
 * cada tecnologia de forma limpa e encapsulada.
 */

//================================================================================
// Imports
//================================================================================

import React from 'react';

// Importando componentes específicos do Ant Design para "tree-shaking"
// Isso garante que apenas os componentes que usamos sejam incluídos no bundle final.
import { Layout, Row, Col, Card, Typography, Avatar } from 'antd';

//================================================================================
// Constantes e Tipos
//================================================================================

// Extraímos os componentes do Layout e Typography para facilitar a leitura no JSX.
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

/**
 * @interface TechInfo
 * @description Define a estrutura de dados para cada tecnologia que será exibida.
 * A utilização de uma interface garante a consistência dos dados e
 * o "type-safety" em todo o componente.
 */
interface TechInfo {
  /** Chave única e estável para o React, usada no `.map()`. */
  id: string;
  /** Nome da tecnologia, usado no título do Card. */
  name: string;
  /** URL pública do logo da tecnologia. */
  logoUrl: string;
  /** Breve descrição da tecnologia. */
  description: string;
}

/**
 * @const techStackData
 * @description Array contendo os dados das tecnologias.
 * Em uma aplicação real, isso poderia vir de um CMS ou de uma API.
 * Manter isso como uma constante separada do JSX melhora a legibilidade.
 */
const techStackData: TechInfo[] = [
  {
    id: 'vite',
    name: 'Vite',
    logoUrl: 'https://vitejs.dev/logo.svg',
    description: 'Um "build tool" para front-end moderno que oferece uma experiência de desenvolvimento extremamente rápida, com Hot Module Replacement (HMR) instantâneo.',
  },
  {
    id: 'react',
    name: 'React',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: 'Uma biblioteca JavaScript declarativa, eficiente e flexível para criar interfaces de usuário (UIs) complexas, baseada em componentes reutilizáveis.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
    description: 'Um superset do JavaScript que adiciona tipagem estática opcional. Ajuda a construir aplicações robustas, detectar erros em tempo de compilação e melhorar a manutenibilidade.',
  },
  {
    id: 'ant-design',
    name: 'Ant Design (antd)',
    logoUrl: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    description: 'Uma biblioteca de componentes de UI para React, seguindo a linguagem de design Ant. Oferece um conjunto rico de componentes de alta qualidade e prontos para uso.',
  },
];

//================================================================================
// Componente Principal
//================================================================================

/**
 * @component HomePage
 * @description O componente funcional da página Home.
 */
const HomePage: React.FC = () => {
  
  /**
   * @function renderTechCards
   * @description Renderiza a lista de cards de tecnologia.
   * Isolamos essa lógica de renderização em uma função ou variável
   * para manter o `return` principal do componente mais limpo.
   */
  const renderTechCards = () => (
    // Usamos o Grid do Ant Design (Row/Col) para responsividade.
    // O `gutter` adiciona espaçamento horizontal e vertical entre os cards.
    <Row gutter={[24, 24]}>
      {techStackData.map((tech) => (
        // Definição de breakpoints para responsividade:
        // - xs: (Extra Small) < 576px -> 1 coluna (ocupa 24 de 24)
        // - sm: (Small) >= 576px -> 2 colunas (ocupa 12 de 24)
        // - md: (Medium) >= 768px -> 2 colunas (ocupa 12 de 24)
        // - lg: (Large) >= 992px -> 4 colunas (ocupa 6 de 24)
        <Col xs={24} sm={12} md={12} lg={6} key={tech.id}>
          {/* O `key` é essencial para o React identificar unicamente cada
            item na iteração e otimizar as atualizações do DOM.
          */}
          <Card
            hoverable // Efeito de "hover" sutil para indicar interatividade.
            style={{ height: '100%' }} // Garante que todos os cards na mesma linha tenham a mesma altura.
          >
            {/* Usamos `Card.Meta` para um layout padronizado de "avatar + título + descrição".
              O `Avatar` é usado para exibir o logo de forma padronizada.
            */}
            <Card.Meta
              avatar={<Avatar src={tech.logoUrl} shape="square" size={64} alt={`${tech.name} Logo`} />}
              title={<Title level={4}>{tech.name}</Title>}
              description={<Paragraph>{tech.description}</Paragraph>}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  // Renderização principal do componente
  return (
    // `Layout` é o container principal da página.
    // Usamos `minHeight: '100vh'` para garantir que o footer
    // fique no final da página, mesmo com pouco conteúdo.
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header: Cabeçalho da página. 
        O estilo inline é aceitável para ajustes de layout simples.
      */}
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          Projeto Vite + React + TS + AntD
        </Title>
      </Header>

      {/* Content: Container principal do conteúdo da página.
        Adicionamos um padding interno para que o conteúdo não
        cole nas bordas da tela.
      */}
      <Content style={{ padding: '48px' }}>
        {/* Usamos um `div` com fundo branco (padrão do AntD) para 
          criar uma "caixa" de conteúdo principal.
        */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
          <Title level={2} style={{ marginBottom: '24px', textAlign: 'center' }}>
            Sobre as Tecnologias do Projeto
          </Title>

          {/* Renderiza os cards das tecnologias */}
          {renderTechCards()}
        </div>
      </Content>

      {/* Footer: Rodapé padrão com alinhamento centralizado. */}
      <Footer style={{ textAlign: 'center' }}>
        Meu Projeto ©2025 - Criado por [Seu Nome]
      </Footer>
    </Layout>
  );
};

// Exportamos o componente como "default" para ser usado pelo
// sistema de roteamento (ex: React Router).
export default HomePage;