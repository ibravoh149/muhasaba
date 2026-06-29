const { withGradleProperties, withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');

const JAVA_HOME = '/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home';
const GRADLE_VERSION = '8.13';
const IS_EAS = !!process.env.EAS_BUILD;

// Only set java.home for local builds — EAS manages its own Java installation
const withJavaHome = (config) =>
  withGradleProperties(config, (mod) => {
    if (IS_EAS) return mod;

    const props = mod.modResults;
    const existing = props.findIndex(
      (p) => p.type === 'property' && p.key === 'org.gradle.java.home',
    );
    const entry = { type: 'property', key: 'org.gradle.java.home', value: JAVA_HOME };
    if (existing >= 0) {
      props[existing] = entry;
    } else {
      props.push(entry);
    }
    return mod;
  });

// Pins the Gradle wrapper version in gradle-wrapper.properties
const withGradleWrapper = (config) =>
  withDangerousMod(config, [
    'android',
    (mod) => {
      const wrapperPath = path.join(
        mod.modRequest.platformProjectRoot,
        'gradle/wrapper/gradle-wrapper.properties',
      );
      if (fs.existsSync(wrapperPath)) {
        let content = fs.readFileSync(wrapperPath, 'utf8');
        content = content.replace(
          /distributionUrl=.*gradle-.*-bin\.zip/,
          `distributionUrl=https\\://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip`,
        );
        fs.writeFileSync(wrapperPath, content);
      }
      return mod;
    },
  ]);

module.exports = (config) => withGradleWrapper(withJavaHome(config));
