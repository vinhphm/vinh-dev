import useTranslation from 'next-translate/useTranslation'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = ({ navShow, onToggleNav }) => {
  const { t } = useTranslation()

  return (
    <div className="sm:hidden">
      <div
        className={`fixed w-full h-screen top-12 right-0 bg-white dark:bg-black z-30 transform ease-in-out duration-500 ${
          navShow ? 'translate-x-0' : '-translate-x-full'
        } bg-opacity-30 dark:bg-opacity-30 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100`}
      >
        <nav className="mt-8 relative space-y-8 z-40">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12">
              <Link
                href={link.href}
                title={link.title}
                className="text-xl font-semibold leading-8 tracking-wide text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                onClick={onToggleNav}
              >
                {t(`headerNavLinks:${link.title.toLowerCase()}`)}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
