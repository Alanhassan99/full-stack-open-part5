// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Fredric',
        username: 'Fred',
        password: 'ric'
      }
    })
    page.on('dialog', dialog => dialog.accept())
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = page.getByLabel('username')
    const password = page.getByLabel('password')
    const login = page.getByRole('button')
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
    await expect(login).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('Fred')
      await page.getByLabel('password').fill('ric')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Fred logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('Fredrik')
      await page.getByLabel('password').fill('rik')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Fredric',
          username: 'Fred',
          password: 'ric'
        }
      })
      await page.goto('http://localhost:5173')
      await page.getByLabel('username').fill('Fred')
      await page.getByLabel('password').fill('ric')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Fred logged in')).toBeVisible()
      page.reload()

    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('OldBlog')
      await page.getByRole('textbox', { name: 'author:' }).fill('YoungMan')
      await page.getByRole('textbox', { name: 'url:' }).fill('AverageUrl')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('added')).toBeVisible()

    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Fredric',
          username: 'Fred',
          password: 'ric'
        }

      })
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Hehe',
          username: 'Hihi',
          password: 'hoho'
        }

      })
      await page.goto('http://localhost:5173')
      await page.getByLabel('username').fill('Fred')
      await page.getByLabel('password').fill('ric')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Fred logged in')).toBeVisible()
      page.reload()
    })

    test('a new blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('OldBlog')
      await page.getByRole('textbox', { name: 'author:' }).fill('YoungMan')
      await page.getByRole('textbox', { name: 'url:' }).fill('AverageUrl')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('view').waitFor()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()

    })

    test('a blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('OldBlog')
      await page.getByRole('textbox', { name: 'author:' }).fill('YoungMan')
      await page.getByRole('textbox', { name: 'url:' }).fill('AverageUrl')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('view').waitFor()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByText('remove')
      await page.getByRole('button', { name: 'remove' }).click()
      await page.getByText('create new blog').waitFor({ timeout: 10000 })
      await expect(page.getByText('OldBlog')).toBeHidden()


    })

    test('only the user can see the remove button', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('OldBlog')
      await page.getByRole('textbox', { name: 'author:' }).fill('YoungMan')
      await page.getByRole('textbox', { name: 'url:' }).fill('AverageUrl')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('view').waitFor()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByText('remove')
      await expect(page.getByText('remove')).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()

      page.reload()
      await page.getByLabel('username').fill('Hihi')
      await page.getByLabel('password').fill('hoho')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('view').waitFor({ timeout: 5000 })
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).toBeHidden()

    })

    test.only('blogs are in right order', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('OldBlog')
      await page.getByRole('textbox', { name: 'author:' }).fill('YoungMan')
      await page.getByRole('textbox', { name: 'url:' }).fill('AverageUrl')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('view').waitFor()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByText('like').waitFor()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByText('create new blog').waitFor({ timeout: 10000 })
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('Movie')
      await page.getByRole('textbox', { name: 'author:' }).fill('Serial')
      await page.getByRole('textbox', { name: 'url:' }).fill('Boat')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Movie').waitFor({ timeout: 10000 })
      await page.getByRole('button', { name: 'view' }).nth(1).waitFor({ timeout: 10000 })
      await page.getByRole('button', { name: 'view' }).nth(1).click()
      await page.getByText('like').waitFor()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByText('likes 3').waitFor({ timeout: 10000 })
      await page.getByRole('button', { name: 'hide' }).click()
      await page.reload()
      await page.getByText('create new blog').first().waitFor({ timeout: 10000 })
      await page.getByText('view').first().waitFor({ timeout: 10000 })
      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByText('likes 3').waitFor({ timeout: 10000 })

      await expect(page.getByText('likes 3')).toBeVisible()



    })

  })
})




