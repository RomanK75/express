export default {
  // Укажите директорию для отчетов о покрытии
  coverageDirectory: 'coverage',
  // Укажите форматы отчетов о покрытии
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  // Укажите окружение для тестов
  testEnvironment: 'node',
  // Укажите преобразователь для файлов
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};