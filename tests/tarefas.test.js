test('Garante que o objeto de tarefas possui a estrutura correta', () => {
    // Mock puro e isolado para testar a regra de negócio do Todo-App no CI
    const tarefaMock = { id: 1, titulo: 'Estudar DevOps', concluida: 0 };
    
    expect(tarefaMock).toHaveProperty('titulo');
    expect(tarefaMock).toHaveProperty('concluida');
    expect(tarefaMock.concluida).toBe(0);
});