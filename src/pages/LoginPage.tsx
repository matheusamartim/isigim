/**
 * @file LoginPage.tsx
 * @description Página de login do usuário.
 *
 * NOTA: Este arquivo contém erros intencionais para fins de teste de pipeline de QA.
 */

//================================================================================
// Imports
//================================================================================

import React, { useState } from 'react';
import { Layout, Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// [ERRO 1: Importação Desnecessária]
// 'Spin' é importado mas nunca é utilizado no componente.
import { Spin } from 'antd';

//================================================================================
// Constantes
//================================================================================

const { Title } = Typography;
const { Content } = Layout;

//================================================================================
// Componente Principal
//================================================================================

/**
 * @component LoginPage
 * @description Renderiza o formulário de login centrado na tela.
 */
const LoginPage: React.FC = () => {
  // [ERRO 2: Gerenciamento de Estado Redundante]
  // O Ant Design Form (`useForm`) gerencia o estado internamente.
  // Usar `useState` para campos de formulário é desnecessário, verboso e
  // leva a bugs de sincronização (como visto no 'onFinish').
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // [ERRO 3: Estado Não Utilizado]
  // A variável 'loading' é definida mas nunca lida ou alterada.
  const [loading, setLoading] = useState(false);

  /**
   * [ERRO 4: Tipagem 'any']
   * O evento 'e' está tipado como 'any', perdendo toda a segurança do TypeScript.
   * O tipo correto seria React.ChangeEvent<HTMLInputElement>.
   */
  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  /**
   * [ERRO 5: Declaração de Função Ineficiente]
   * Esta função é puramente lógica e não depende de hooks ou estado.
   * Ela será recriada em CADA renderização do LoginPage, o que é ineficiente.
   * Deveria ser definida fora do componente ou, se usasse estado, envolvida em `useCallback`.
   */
  function validatePassword(pass: string) {
    if (pass.length < 8) return false;
    return true;
  }

  /**
   * [ERRO 6: Tipagem 'any' em Callback]
   * 'values' é o payload do formulário e não deve ser 'any'.
   * O Ant Design permite inferir ou tipar isso corretamente (ex: interface LoginForm).
   */
  const onFinish = (values: any) => {
    // [ERRO 7: Log de Debug]
    // 'console.log' nunca deve ser enviado para produção.
    console.log('Form values (do AntD):', values);

    // [ERRO 8: BUG LÓGICO GRAVE]
    // O callback 'onFinish' recebe os valores do formulário em 'values'.
    // Este código ignora 'values' e usa o estado manual ('username', 'password'),
    // que pode estar dessincronizado ou incorreto.
    // A validação está usando 'password' (do state) e 'username' (do state).
    if (validatePassword(password) && username === 'admin') {
      message.success('Login bem-sucedido!');
      // Simula redirecionamento
    } else {
      // [ERRO 9: Feedback de Erro Inadequado]
      // 'console.error' não é uma forma de dar feedback ao usuário.
      console.error('Falha no login. Verifique os dados.');
      message.error('Usuário ou senha inválidos.');
    }
  };

  // Mensagens de boas-vindas
  const messages = ['Bem-vindo de volta!', 'Faça login para continuar.'];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        {/* Usamos Row/Col para centralizar o formulário */}
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={22} sm={16} md={12} lg={8} xl={6}>
            
            {/* [ERRO 10: Estilo Inline Excessivo]
                Embora funcional, todo esse bloco de estilo inline dificulta a
                manutenção e a reutilização. Deveria estar em um arquivo .css
                ou usar uma solução CSS-in-JS.
            */}
            <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
              
              <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                Login
              </Title>

              {/* [ERRO 11: Falta da prop 'key' no React]
                  Iterar sobre um array (messages.map) para renderizar elementos
                  EXIGE uma prop 'key' única para cada elemento,
                  o que otimiza o DOM e evita bugs de renderização.
              */}
              {messages.map((msg) => (
                <p style={{ textAlign: 'center' }}>{msg}</p>
              ))}

              <Form onFinish={onFinish} layout="vertical">
                
                {/* [ERRO 12: Acessibilidade (a11y)]
                    Este item de formulário não tem um <label> visível ou
                    um 'aria-label', prejudicando leitores de tela.
                */}
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
                >
                  {/* [ERRO 13: Conflito de Controle de Estado]
                      O Input tem 'onChange' e 'value' (controlado pelo useState)
                      E o Form.Item pai tem 'name' (controlado pelo Antd Form).
                      Isso cria dois donos para o estado do input, gerando
                      comportamento imprevisível. O 'onChange' e 'value' devem ser removidos.
                  */}
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Usuário (use 'admin')"
                    onChange={handleUsernameChange} // REDUNDANTE E PROBLEMÁTICO
                    value={username} // REDUNDANTE E PROBLEMÁTICO
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Senha (8+ caracteres)"
                    onChange={(e) => setPassword(e.target.value)} // REDUNDANTE E PROBLEMÁTICO
                    value={password} // REDUNDANTE E PROBLEMÁTICO
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Entrar
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginPage;