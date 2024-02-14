import { StyleSheet, View } from 'react-native';
import { useMemo, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import { Typography } from '../Typography';
import type { IFaq } from './models';
import { useTheme } from '../../hooks';
import { TopTabBar } from '../TopTabBar';
import { FaqQuestions } from './Components';

const Tab = createMaterialTopTabNavigator<any>();

export const Faq: React.FC = () => {
  const [faqs] = useState<IFaq[]>([
    {
      id: '2200112b-7c8b-448a-93e6-2943f83e7bb9',
      name: 'Reembolso',
      mail: 'sac@itamed.com.br',
      whatsappPhoneNumber: '(45)35768005',
      enable: true,
      language: {
        id: '03ce6383-9b3d-4a58-bf96-1c6f642251b6',
        name: 'Português (Brasil)',
        code: 'pt-BR',
      },
      faqQuestions: [
        {
          id: '36c3ecea-6f32-4100-ae46-8eab1860e28d',
          question:
            'Quais são os documentos necessários para a solicitação de reembolso?',
          answer:
            '<p><span style="color: rgb(51, 51, 51)">Necessário ter nota fiscal ou recibo com declaração dos procedimentos realizados, o beneficiário/contratante deve comparecer na Operadora com os documentos em mãos e preencher o Termo de Solicitação de Reembolso.</span></p>',
          displayOrder: 2,
          enable: true,
        },
        {
          id: '6c5e5796-ee08-4c9e-af32-200e8e0df048',
          question:
            'Quais documentos não são aceitos para solicitação de Reembolso?',
          answer:
            '<p>Independente do procedimento realizado, para o efetivo reembolso, NÃO serão aceitos como documentos comprobatórios para a prestação de serviços: </p><p>• Recibos rasurados; </p><p>• Recibos Provisórios de Serviços (RPS); </p><p>• Recibos temporário (em forma de caução), nota de débito ou duplicatas;</p><p> • Declarações ou orçamento de prestação de serviços.</p>',
          displayOrder: 18,
          enable: true,
        },
        {
          id: 'a08c6b17-2470-4910-a160-10dd8352ffd8',
          question: 'Qual o prazo para a análise de reembolso?',
          answer:
            '<p>O prazo para pagamento do reembolso previsto pela ANS é de 30 dias.</p>',
          displayOrder: 10,
          enable: true,
        },
        {
          id: '1d520224-414e-4f62-89a1-48a85c5cac6a',
          question:
            'Depois de quanto tempo após o atendimento ainda posso solicitar o reembolso?',
          answer:
            '<p>O prazo contratual para solicitação de reembolso é de 1 (um) ano, a contar da data exposta no documento fiscal (recibo ou nota fiscal).</p>',
          displayOrder: 9,
          enable: true,
        },
      ],
    },
  ]);

  const { spacing, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingLeft: spacing(4),
          flex: 1,
          flexGrow: 1,
        },
        text: {
          ...typography.title1,
          marginBottom: spacing(4),
        },
      }),
    [spacing, typography]
  );

  return (
    <View style={styles.container}>
      <Typography style={styles.text}>FAQ</Typography>
      <Tab.Navigator
        tabBar={TopTabBar}
        screenOptions={{
          tabBarGap: 10,
          tabBarScrollEnabled: true,
          tabBarStyle: { height: 60, flexGrow: 0 },
        }}
        sceneContainerStyle={{
          paddingRight: spacing(4),
        }}
      >
        {faqs.map((faq) => {
          return (
            <Tab.Screen
              key={faq.id}
              name={faq.id}
              component={FaqQuestions}
              options={{
                title: faq.name,
              }}
              initialParams={{
                questions: faq.faqQuestions,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
};
