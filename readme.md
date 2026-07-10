## Mongoose `pre("save")` Middleware (`next()` No Longer Required)

### Problem

While implementing password hashing with Mongoose's `pre("save")` middleware, I initially followed an older tutorial that used the `next()` callback inside an asynchronous middleware function.



This resulted in the following runtime error:

```text
TypeError: next is not a function
```

### Cause

The code was written using an older Mongoose middleware pattern. In **Mongoose v8+**, asynchronous middleware is Promise-based, so Mongoose automatically waits for the `async` function to finish. The `next()` callback is no longer required in most async middleware.

### Solution

I removed the `next` parameter and allowed the middleware to complete naturally.