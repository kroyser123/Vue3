import { test, expect } from '@playwright/test'

test.describe('Модальные окна', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('открывает и закрывает простое окно', async ({ page }) => {
    await page.click('text=Простое окно')
    await expect(page.locator('.modal-container')).toBeVisible()
    await expect(page.locator('.modal-title')).toHaveText('Простое окно')

    await page.click('.modal-close')
    await expect(page.locator('.modal-container')).toBeHidden()
  })

  test('закрытие по клику на оверлей', async ({ page }) => {
    await page.click('text=Простое окно')
    await expect(page.locator('.modal-container')).toBeVisible()

    // Кликаем по оверлею (фону), а не по контенту
    await page.click('.modal-overlay', { position: { x: 10, y: 10 } })
    await expect(page.locator('.modal-container')).toBeHidden()
  })

  test('закрытие по Escape', async ({ page }) => {
    await page.click('text=Простое окно')
    await expect(page.locator('.modal-container')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.locator('.modal-container')).toBeHidden()
  })

  test('счетчик активных окон обновляется', async ({ page }) => {
    await page.click('text=Простое окно')
    await expect(page.locator('.stat-value')).toHaveText('1')

    await page.click('.modal-close')
    await expect(page.locator('.stat-value')).toHaveText('0')
  })
})

test.describe('Стек модальных окон', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('открывает несколько окон в стеке', async ({ page }) => {
    await page.click('text=Стек окон')
    await expect(page.locator('.modal-title')).toHaveText('Окно №1')
    await expect(page.locator('.stat-value')).toHaveText('1')

    await page.click('button:has-text("Открыть ещё")')
    await expect(page.locator('.modal-title')).toHaveText('Окно №2')
    await expect(page.locator('.stat-value')).toHaveText('2')

    await page.click('button:has-text("Открыть ещё")')
    await expect(page.locator('.modal-title')).toHaveText('Окно №3')
    await expect(page.locator('.stat-value')).toHaveText('3')
  })

  test('закрывает текущее окно, показывает предыдущее', async ({ page }) => {
    await page.click('text=Стек окон')
    await page.click('button:has-text("Открыть ещё")')
    await page.click('button:has-text("Открыть ещё")')
    await expect(page.locator('.modal-title')).toHaveText('Окно №3')

    await page.click('button:has-text("Закрыть это окно")')
    await expect(page.locator('.modal-title')).toHaveText('Окно №2')

    await page.click('button:has-text("Закрыть это окно")')
    await expect(page.locator('.modal-title')).toHaveText('Окно №1')
  })

  test('закрывает все окна', async ({ page }) => {
    await page.click('text=Стек окон')
    await page.click('button:has-text("Открыть ещё")')
    await page.click('button:has-text("Открыть ещё")')

    await page.click('button:has-text("Закрыть все окна")')
    await expect(page.locator('.modal-container')).toBeHidden()
    await expect(page.locator('.stat-value')).toHaveText('0')
  })
})

test.describe('Footer с кнопками', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('отображает кнопки в footer', async ({ page }) => {
    await page.click('text=Окно с подтверждением')
    await expect(page.locator('.modal-footer button')).toHaveCount(2)
    await expect(page.locator('.modal-footer button').first()).toHaveText('Отмена')
    await expect(page.locator('.modal-footer button').last()).toHaveText('Удалить')
  })

  test('кнопка Отмена закрывает окно', async ({ page }) => {
    await page.click('text=Окно с подтверждением')
    await page.click('button:has-text("Отмена")')
    await expect(page.locator('.modal-container')).toBeHidden()
  })

  test('кнопка Удалить закрывает окно и выводит в консоль', async ({ page }) => {
    const logs: string[] = []
    page.on('console', (msg) => logs.push(msg.text()))

    await page.click('text=Окно с подтверждением')
    await page.click('button:has-text("Удалить")')

    await expect(page.locator('.modal-container')).toBeHidden()
    expect(logs.some((log) => log.includes('Удалено'))).toBe(true)
  })
})

test.describe('Promise API', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('PromiseModal возвращает true при нажатии Да', async ({ page }) => {
    let alertText = ''
    page.on('dialog', async (dialog) => {
      alertText = dialog.message()
      await dialog.accept()
    })

    await page.click('text=Promise Demo')
    await page.click('button:has-text("Да")')

    await expect(page.locator('.modal-container')).toBeHidden()
    expect(alertText).toBe('Вы выбрали: ДА')
  })

  test('PromiseModal возвращает false при нажатии Нет', async ({ page }) => {
    let alertText = ''
    page.on('dialog', async (dialog) => {
      alertText = dialog.message()
      await dialog.accept()
    })

    await page.click('text=Promise Demo')
    await page.click('button:has-text("Нет")')

    await expect(page.locator('.modal-container')).toBeHidden()
    expect(alertText).toBe('Вы выбрали: НЕТ')
  })
})

test.describe('Управление фокусом', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('фокус на крестике при открытии', async ({ page }) => {
    await page.click('text=Простое окно')
    await expect(page.locator('.modal-close')).toBeFocused()
  })

  test('Tab циклически перемещается по элементам', async ({ page }) => {
    await page.click('text=Окно с подтверждением')
    await expect(page.locator('.modal-close')).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.locator('.modal-footer button').first()).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.locator('.modal-footer button').last()).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.locator('.modal-close')).toBeFocused()
  })

  test('фокус возвращается на кнопку после закрытия', async ({ page }) => {
    const button = page.locator('text=Простое окно')
    await button.click()
    await page.keyboard.press('Escape')
    await expect(button).toBeFocused()
  })
})

test.describe('Скролл', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('скролл внутри модального окна', async ({ page }) => {
    await page.click('text=Окно со скроллом')
    const modalBody = page.locator('.modal-body')
    await expect(modalBody).toHaveCSS('overflow-y', 'auto')
  })

  test('блокировка скролла фона при открытой модалке', async ({ page }) => {
    const initialScroll = await page.evaluate(() => document.body.style.overflow)
    expect(initialScroll).not.toBe('hidden')

    await page.click('text=Простое окно')
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow)
    expect(bodyOverflow).toBe('hidden')

    await page.keyboard.press('Escape')
    const finalOverflow = await page.evaluate(() => document.body.style.overflow)
    expect(finalOverflow).not.toBe('hidden')
  })
})
