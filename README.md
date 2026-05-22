# Modal System

Система управления модальными окнами с поддержкой стека, фокус-трапа, Promise API и полным тестовым покрытием.

## Технологии

- Vue 3 + TypeScript
- Pinia (state management)
- Vitest (unit tests)
- Playwright (E2E tests)
- Docker + Docker Compose

## Быстрый старт

### Требования

- Node.js 18+
- npm 9+
- Docker (опционально)

### Установка и запуск

```
bash
# 1. Клонировать репозиторий
git clone <repository-url>
cd modal-system

# 2. Установить зависимости
npm install

# 3. Запустить dev сервер
npm run dev
Приложение будет доступно по адресу: http://localhost:5173

Тестирование
Unit тесты (Vitest)
bash
# Запустить unit тесты
npm run test

# Запустить с покрытием
npm run test:coverage
Результат: 32 теста, покрытие ~85%

E2E тесты (Playwright)
bash
# Запустить E2E тесты
npm run test:e2e
Результат: 17 тестов, все проходят

Запуск всех тестов
bash
npm run test && npm run test:e2e
```
## Docker
```
Запуск через Docker
bash
# Собрать и запустить
docker-compose up --build

# Остановить
docker-compose down
```
```
Или через Makefile
bash
make up      # Запустить
make down    # Остановить
Приложение будет доступно по адресу: http://localhost:5173
```

## Функциональность
### Компонент кнопки
3 варианта стилей (primary, secondary, danger)

Состояния disabled и loading

Анимации при наведении и клике

## Модальное окно
Заголовок, тело, футер

Закрытие: крестик, клик на оверлей, Esc

Скролл внутри окна и на уровне страницы

Блокировка скролла фона

## Система показа
Императивный API (modalStore.openModal())

Стек модальных окон

Promise API для получения результата

Управление фокусом (trap focus + возврат)

## Демо-страница
Простое окно

Окно со скроллом внутри

Высокое окно (страничный скролл)

Стек окон (вложенные)

Окно с подтверждением (footer кнопки)

Promise Demo
```
Команды
Команда	                  Описание
npm run dev				  Запустить dev сервер
npm run build				Собрать проект
npm run test	             Запустить unit тесты
npm run test:coverage	    Запустить тесты с покрытием
npm run test:e2e	         Запустить E2E тесты
docker-compose up --build	Запустить в Docker
make up	                  Запустить через Makefile
make down	                Остановить через Makefile
```
Итог
Проект полностью готов к использованию:

✅ 32 unit теста (Vitest)

✅ 17 E2E тестов (Playwright)

✅ Покрытие кода ~85%

✅ Полная типизация TypeScript

✅ Docker + Docker Compose

✅ Makefile для удобного запуска
