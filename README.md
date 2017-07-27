# let-me-pot

Version: 0.1.1

Auto HP/MP Pot module for Tera Proxy.

Still need some tests. If you find any bug just let me know.

**Need _Command_ module by Pinkie to work.**

## Done
 * Auto HP Potion usage, configurable options:
    * When to use (HP percent)
    * Support for multiple potions
    * Support for non-shared cooldowns usage
 * Auto MP Potion usage, configurable options:
    * When to use (MP percent)
    * Support for multiple potions
    * Support for non-shared cooldowns usage
 * It will only use potions if you are alive and in combat
 * Can add and configure any potion in the 'potion.js' file
 * Can change in 'index.js' file if you want notifications or not

 ## Commands
 **Need to be used in _Proxy Channel_ (/proxy)**
```
/proxy getpotinfo (see below)
/proxy letmepot (Toggle the module on/off)
```

 ## How to use auto HP without auto MP or vice versa
 * Open 'index.js' file and find the options in the top of the file
 * AUTOMANA and AUTOHP

 ## How to get new potions ID
 * Use the command /proxy getpotinfo
 * See if it shows the message: 'Use the potion you want and watch the infos in proxy console.'
 * Open you inventory and use the potion you want to know the id
 * See in proxy console the infos about your potion
 * Open 'potions.js' and follow the instructions in the top of the file
